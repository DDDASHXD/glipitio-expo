import { StyleSheet, View, Text } from "react-native";
import TestComponent from "@/components/test-component";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <TestComponent />
      <Text>Hej</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    paddingTop: 70
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white"
  }
});
