import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Keyboard,
  Alert
} from "react-native";
import React from "react";
import Button from "@/components/ui/button";
import { strapiAuthApi } from "@/lib/strapi";
import { router } from "expo-router";

const Register = () => {
  const [values, setValues] = React.useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const handleRegister = async () => {
    Keyboard.dismiss();

    if (values.password !== values.confirmPassword) {
      Alert.alert("Passwords do not match");
      return;
    }

    try {
      await strapiAuthApi.register({
        username: values.email,
        email: values.email,
        password: values.password
      });

      router.replace("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: "white", padding: 16, gap: 24 }}>
      <Text style={{ fontSize: 24, fontWeight: "bold" }}>
        Create an account
      </Text>

      <View style={{ gap: 8 }}>
        <TextInput
          placeholder="Full name"
          value={values.name}
          onChangeText={(text) => setValues({ ...values, name: text })}
          placeholderTextColor="#9CA3AF"
          style={styles.input}
          autoCapitalize="words"
        />
        <TextInput
          placeholder="Email address"
          value={values.email}
          keyboardType="email-address"
          autoCapitalize="none"
          autoComplete="email"
          autoCorrect={false}
          onChangeText={(text) => setValues({ ...values, email: text })}
          placeholderTextColor="#9CA3AF"
          style={styles.input}
        />
        <TextInput
          placeholder="Password"
          secureTextEntry
          value={values.password}
          onChangeText={(text) => setValues({ ...values, password: text })}
          placeholderTextColor="#9CA3AF"
          style={styles.input}
        />
        <TextInput
          placeholder="Confirm Password"
          secureTextEntry
          value={values.confirmPassword}
          onChangeText={(text) =>
            setValues({ ...values, confirmPassword: text })
          }
          placeholderTextColor="#9CA3AF"
          style={styles.input}
        />
      </View>

      <Button onPress={handleRegister} variant="primary">
        <Text style={{ color: "white" }}>Register</Text>
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    width: "100%",
    padding: 16,
    backgroundColor: "#F3F4F6",
    borderRadius: 12,
    color: "#111827"
  }
});

export default Register;
