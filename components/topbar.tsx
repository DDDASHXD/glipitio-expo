import React from "react";
import { View, Text, StyleSheet, Animated } from "react-native";
import { IconSymbol } from "./ui/IconSymbol";
import { router } from "expo-router";
import Button from "./ui/button";
import * as Haptics from "expo-haptics";
import { BlurView } from "expo-blur";

const Topbar = ({
  name,
  scrollY = 0
}: {
  name: string;
  scrollY?: number | Animated.Value;
}) => {
  const opacity =
    scrollY instanceof Animated.Value
      ? scrollY.interpolate({
          inputRange: [0, 20, 50],
          outputRange: [0, 0.5, 1],
          extrapolate: "clamp"
        })
      : scrollY > 0
      ? 1
      : 0;

  return (
    <View style={styles.container}>
      <Animated.View style={[StyleSheet.absoluteFill, { opacity }]}>
        <BlurView intensity={80} style={StyleSheet.absoluteFill} tint="light" />
      </Animated.View>
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
    right: 0,
    zIndex: 10,
    height: 110,
    width: "100%",
    paddingHorizontal: 10,
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
