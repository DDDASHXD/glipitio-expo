import { Tabs } from "expo-router";
import React from "react";
import { View } from "react-native";
import useConsentStore from "@/stores/consent.store";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { BlurView } from "expo-blur";

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
      <Tabs
        screenOptions={{
          headerShown: false,
          animation: "fade",
          tabBarStyle: {
            position: "absolute",
            borderTopWidth: 1,
            borderTopColor: "rgba(0, 0, 0, 0.1)",
            paddingBottom: 20,
            backgroundColor: "transparent"
          },
          tabBarBackground: () => (
            <BlurView intensity={80} style={{ flex: 1 }} tint="light" />
          ),
          tabBarActiveTintColor: "#000000",
          tabBarInactiveTintColor: "#8E8E93",
          tabBarLabelStyle: {
            fontSize: 12,
            marginTop: 4
          }
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            tabBarLabel: "Home",
            tabBarIcon: ({ focused, color }) => (
              <IconSymbol
                name={focused ? "house.fill" : "house"}
                size={24}
                color={color}
              />
            )
          }}
        />
        <Tabs.Screen
          name="receipts"
          options={{
            tabBarLabel: "Receipts",
            tabBarIcon: ({ focused, color }) => (
              <IconSymbol
                name={focused ? "ticket.fill" : "ticket"}
                size={24}
                color={color}
              />
            )
          }}
        />
        <Tabs.Screen
          name="stores"
          options={{
            tabBarLabel: "Stores",
            tabBarIcon: ({ focused, color }) => (
              <IconSymbol
                name={focused ? "storefront.fill" : "storefront"}
                size={24}
                color={color}
              />
            )
          }}
        />
        <Tabs.Screen
          name="favorites"
          options={{
            tabBarLabel: "Favorites",
            tabBarIcon: ({ focused, color }) => (
              <IconSymbol
                name={focused ? "heart.fill" : "heart"}
                size={24}
                color={color}
              />
            )
          }}
        />
      </Tabs>
    </View>
  );
};

export default TabsLayout;
