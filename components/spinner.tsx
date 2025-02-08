import { ActivityIndicator, StyleSheet, View } from "react-native";
import React from "react";

interface SpinnerProps {
  size?: number | "small" | "large";
  color?: string;
}

const Spinner: React.FC<SpinnerProps> = ({
  size = "small",
  color = "#007AFF" // iOS blue color
}) => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size={size} color={color} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center"
  }
});

export default Spinner;
