import { router } from "expo-router";
import React from "react";
import {
  View,
  Text,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  Keyboard
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import useAuthStore from "@/stores/auth.store";
import { strapiClient } from "@/lib/strapi";
import axios from "axios";
import Button from "@/components/ui/button";

const SignIn = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const login = useAuthStore((state) => state.login);

  const handleSignIn = async () => {
    try {
      await login(email, password);
      router.replace("/");
    } catch (error: any) {
      console.error(error);
      const errorMessage =
        error.response?.data?.error?.message ||
        `Failed to connect to server at ${process.env.NEXT_PUBLIC_STRAPI_URL}. ` +
          "Please check your connection and server URL.";
      alert(errorMessage);
    }
  };

  return (
    <ImageBackground
      source={require("@/assets/images/signin-bg.jpg")}
      style={{ flex: 1 }}
    >
      <SafeAreaView
        style={{
          flex: 1,
          padding: 16,
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <View
          style={{
            backgroundColor: "white",
            width: "100%",
            padding: 24,
            borderRadius: 24,
            gap: 24,
            alignItems: "center",
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5
          }}
        >
          <View
            style={{
              width: 50,
              height: 50,
              backgroundColor: "#E5E7EB",
              borderRadius: 12
            }}
          />

          <Text style={{ fontSize: 24, fontWeight: "bold" }}>
            Sign in to your account
          </Text>

          <View style={{ width: "100%", gap: 12 }}>
            <TextInput
              placeholder="Email address"
              value={email}
              keyboardType="email-address"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect={false}
              onChangeText={setEmail}
              placeholderTextColor="#9CA3AF"
              style={{
                width: "100%",
                padding: 16,
                backgroundColor: "#F3F4F6",
                borderRadius: 12,
                color: "#111827"
              }}
            />
            <TextInput
              placeholder="Password"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
              placeholderTextColor="#9CA3AF"
              style={{
                width: "100%",
                padding: 16,
                backgroundColor: "#F3F4F6",
                borderRadius: 12,
                color: "#111827"
              }}
            />
          </View>

          <TouchableOpacity>
            <Text style={{ color: "#6B7280", textDecorationLine: "underline" }}>
              Forgot password?
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              width: "100%",
              padding: 16,
              backgroundColor: "#111827",
              borderRadius: 12,
              alignItems: "center"
            }}
            onPress={() => {
              Keyboard.dismiss();
              handleSignIn();
            }}
          >
            <Text style={{ color: "white", fontWeight: "600" }}>Continue</Text>
          </TouchableOpacity>

          <View
            style={{
              width: "100%",
              flexDirection: "row",
              alignItems: "center",
              gap: 8
            }}
          >
            <View style={{ flex: 1, height: 1, backgroundColor: "#E5E7EB" }} />
            <Text style={{ color: "#6B7280" }}>Or continue with</Text>
            <View style={{ flex: 1, height: 1, backgroundColor: "#E5E7EB" }} />
          </View>

          <View style={{ width: "100%", gap: 12 }}>
            <TouchableOpacity
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                padding: 16,
                backgroundColor: "#F3F4F6",
                borderRadius: 12,
                gap: 8
              }}
            >
              <Text>Sign in with Google</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                padding: 16,
                backgroundColor: "#F3F4F6",
                borderRadius: 12,
                gap: 8
              }}
            >
              <Text>Sign in with Apple</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={{ flexDirection: "row", gap: 4, marginTop: 24 }}>
          <Text style={{ color: "#111827" }}>Not a member?</Text>
          <TouchableOpacity onPress={() => router.push("/register")}>
            <Text style={{ color: "#111827", textDecorationLine: "underline" }}>
              Create an account
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default SignIn;
