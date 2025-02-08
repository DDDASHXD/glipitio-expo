import React from "react";
import { View, Text, StyleSheet, Vibration } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Link, LinkProps, usePathname } from "expo-router";
import * as Haptics from "expo-haptics";
import { IconSymbol, type IconSymbolName } from "./ui/IconSymbol";
import { BlurView } from "expo-blur";

const TabBarItem = ({
  name,
  activeName,
  label,
  href
}: {
  name: IconSymbolName;
  activeName: IconSymbolName;
  label: string;
  href: LinkProps["href"];
}) => {
  const pathname = usePathname();
  const isActive = pathname === href;
  const color = isActive ? "#000000" : "#8E8E93";

  return (
    <Link
      href={href}
      replace
      onPress={() => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Soft);
        console.log(`Clicked ${label} tab`);
      }}
      style={item.container}
    >
      <View style={item.content}>
        <IconSymbol
          name={isActive ? activeName : name}
          size={24}
          color={color}
        />
        <Text
          style={{
            color,
            marginTop: 4,
            fontSize: 12
          }}
        >
          {label}
        </Text>
      </View>
    </Link>
  );
};

const TabBar = () => {
  return (
    <View style={styles.container}>
      <BlurView intensity={80} style={StyleSheet.absoluteFill} tint="light" />
      <View style={styles.content}>
        <TabBarItem
          name="house"
          activeName="house.fill"
          label="Home"
          href="/"
        />
        <TabBarItem
          name="ticket"
          activeName="ticket.fill"
          label="Receipts"
          href="/receipts"
        />
        <TabBarItem
          name="heart"
          activeName="heart.fill"
          label="Favorites"
          href="/favorites"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    borderTopWidth: 1,
    borderTopColor: "rgba(0, 0, 0, 0.1)",
    width: "100%",
    paddingBottom: 20
  },
  content: {
    flexDirection: "row",
    paddingVertical: 15
  }
});

const item = StyleSheet.create({
  container: {
    flex: 1,
    height: 60
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    fontSize: 5
  }
});

export default TabBar;
