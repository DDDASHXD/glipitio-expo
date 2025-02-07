import React from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import Button from "@/components/ui/button";

const SettingsScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Account Settings</Text>
        <Button variant="secondary" onPress={() => {}}>
          <Text>Edit Profile</Text>
        </Button>
        <Button variant="secondary" onPress={() => {}}>
          <Text>Change Password</Text>
        </Button>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Notifications</Text>
        <Button variant="secondary" onPress={() => {}}>
          <Text>Notification Preferences</Text>
        </Button>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>About</Text>
        <Button variant="secondary" onPress={() => {}}>
          <Text>Privacy Policy</Text>
        </Button>
        <Button variant="secondary" onPress={() => {}}>
          <Text>Terms of Service</Text>
        </Button>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  section: {
    marginBottom: 24,
    gap: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
});

export default SettingsScreen; 