import React from "react";
import { Stack } from "expo-router";
import { View } from "react-native";

const AuthLayout = () => {
  return (
    <View style={{ flex: 1, backgroundColor: "F3F3F5" }}>
      <Stack screenOptions={{ animation: "none" }}>
        <Stack.Screen name="sign-in" options={{ headerShown: false }} />
        <Stack.Screen
          name="register"
          options={{
            headerShown: false,
            presentation: "modal",
            animation: "slide_from_bottom"
          }}
        />
      </Stack>
    </View>
  );
};

export default AuthLayout;
