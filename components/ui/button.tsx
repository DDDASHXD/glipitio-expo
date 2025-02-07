import React from "react";
import { View, Text, TouchableOpacity, ViewStyle } from "react-native";

interface Variants {
  default: ViewStyle;
  primary: ViewStyle;
  secondary: ViewStyle;
}

const variants: Variants = {
  default: {
    backgroundColor: "transparent"
  },
  primary: {
    backgroundColor: "#111827"
  },
  secondary: {
    backgroundColor: "rgba(0, 0, 0, 0.05)"
  }
};

const Button = ({
  children,
  onPress,
  variant = "default",
  style
}: {
  children: React.ReactNode;
  onPress: () => void;
  variant?: keyof Variants;
  style?: ViewStyle;
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        ...variants[variant],
        padding: 16,
        borderRadius: 12,
        alignItems: "center",
        ...style
      }}
    >
      {children}
    </TouchableOpacity>
  );
};

export default Button;
