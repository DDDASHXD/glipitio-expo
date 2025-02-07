import TabBar from "@/components/tabbar";
import { router, Stack } from "expo-router";
import React from "react";
import { View } from "react-native";
import useConsentStore from "@/stores/consent.store";

const TabsLayout = () => {
  const { consent } = useConsentStore();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    if (!mounted) {
      setMounted(true);
    }
  }, []);

  // React.useEffect(() => {
  //   if (mounted && !consent) {
  //     setTimeout(() => {
  //       router.replace("/consent");
  //     }, 1000);
  //   }
  // }, [mounted, consent]);

  return (
    <View style={{ flex: 1, backgroundColor: "F3F3F5" }}>
      <Stack screenOptions={{ animation: "none" }}>
        <Stack.Screen
          name="index"
          options={{
            headerShown: false,
            animation: "fade",
            animationDuration: 100
          }}
        />
        <Stack.Screen name="receipts" options={{ headerShown: false }} />
        <Stack.Screen name="favorites" options={{ headerShown: false }} />
        <Stack.Screen
          name="consent"
          options={{
            headerShown: false,
            presentation: "modal",
            animation: "slide_from_bottom",
            sheetAllowedDetents: [100]
          }}
        />
        <Stack.Screen
          name="profile"
          options={{
            animation: "slide_from_bottom",
            presentation: "modal",
            headerShown: false
          }}
        />
      </Stack>
      <TabBar />
    </View>
  );
};

export default TabsLayout;
