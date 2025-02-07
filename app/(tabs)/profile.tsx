import React from "react";
import { router } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";
import Button from "@/components/ui/button";
import useAuthStore from "@/stores/auth.store";

const ProfileModal = () => {
  const logout = useAuthStore((state) => state.logout);
  const navigateToSettings = () => router.push("/settings");
  const user = useAuthStore((state) => state.user);

  return (
    <View style={styles.container}>
      <Text>{user?.name}</Text>
      <Text>{user?.email}</Text>
      <Button onPress={logout} variant="secondary">
        <Text>Log out</Text>
      </Button>
      <Button onPress={navigateToSettings} variant="secondary">
        <Text>Settings</Text>
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 10
  }
});

export default ProfileModal;
