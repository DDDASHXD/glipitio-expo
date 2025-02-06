import React from "react";
import { Text, StyleSheet } from "react-native";

const TestComponent = () => {
  return <Text style={styles.text}>Hej</Text>;
};

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white"
  }
});

export default TestComponent;
