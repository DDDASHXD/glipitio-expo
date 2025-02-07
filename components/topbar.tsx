import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { IconSymbol } from "./ui/IconSymbol";
import { router } from "expo-router";
import Button from "./ui/button";
import * as Haptics from "expo-haptics";

const Topbar = ({ name }: { name: string }) => {
  return (
    <View style={styles.container}>
      <Button
        style={styles.left}
        onPress={() => {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Soft);
          router.push("/profile");
        }}
      >
        <View style={styles.userIcon}>
          <IconSymbol name="person.fill" size={18} color="black" />
        </View>
        <Text style={styles.name}>{name}</Text>
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    height: 120,
    width: "100%",
    padding: 10,
    backgroundColor: "transparent",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end"
  },
  left: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8
  },
  userIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "lightgrey",
    justifyContent: "center",
    alignItems: "center"
  },
  right: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10
  },
  name: {
    fontSize: 23,
    fontWeight: "bold"
  }
});

export default Topbar;
