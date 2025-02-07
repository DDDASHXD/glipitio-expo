import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Redirect, Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { AppState, AppStateStatus } from "react-native";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/useColorScheme";
import AsyncStorage from "@react-native-async-storage/async-storage";
import useAuthStore from "@/stores/auth.store";
import { strapiAuthApi } from "@/lib/strapi";
import axios from "axios";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const RootLayout = () => {
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf")
  });
  const [initialRoute, setInitialRoute] = React.useState<string | null>(null);

  const setUser = useAuthStore((state) => state.setUser);
  const setJwt = useAuthStore((state) => state.setJwt);

  const checkAuth = React.useCallback(async () => {
    try {
      const jwt = await AsyncStorage.getItem("jwt");
      if (!jwt) {
        setInitialRoute("/sign-in");
        return;
      }

      // Set JWT in store and axios headers
      await setJwt(jwt);

      // Fetch and set user data
      try {
        const userData = await strapiAuthApi.getMe(jwt);
        console.log(userData);
        setUser(userData);
        setInitialRoute("/");
      } catch (error) {
        console.log(jwt);
        console.error("Failed to fetch user data:", error);
        // If we can't fetch user data, consider the session invalid
        await AsyncStorage.removeItem("jwt");
        delete axios.defaults.headers.common["Authorization"];
        setInitialRoute("/sign-in");
      }
    } catch (error) {
      console.error("Auth check error:", error);
      setInitialRoute("/sign-in");
    }
  }, [setJwt, setUser]);

  React.useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  React.useEffect(() => {
    checkAuth();

    const subscription = AppState.addEventListener(
      "change",
      (nextAppState: AppStateStatus) => {
        if (nextAppState === "active") {
          checkAuth();
        }
      }
    );

    return () => {
      subscription.remove();
    };
  }, [checkAuth]);

  if (!loaded || !initialRoute) {
    return null;
  }

  return (
    <>
      {initialRoute && <Redirect href={initialRoute as any} />}
      <ThemeProvider value={DefaultTheme}>
        <StatusBar style="light" />
        <Stack screenOptions={{ animation: "none" }}>
          <Stack.Screen name="(auth)" options={{ headerShown: false }} />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" />
        </Stack>
      </ThemeProvider>
    </>
  );
};

export default RootLayout;
