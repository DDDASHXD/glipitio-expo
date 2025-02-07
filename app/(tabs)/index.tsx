import { router } from "expo-router";
import React from "react";
import { View, Text } from "react-native";
import Button from "@/components/ui/button";
import Topbar from "@/components/topbar";
import RecentReceipts from "@/components/widgets/recent-receipts";

const HomeScreen = () => {
  return (
    <View
      style={{
        flex: 1,
        paddingTop: 110,
        paddingHorizontal: 24
      }}
    >
      <Topbar name="Home" />
      <RecentReceipts />
    </View>
  );
};

export default HomeScreen;
