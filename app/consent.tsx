import { Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { Colors } from "@/constants/Colors";
import { IconSymbol } from "@/components/ui/IconSymbol";
import Button from "@/components/ui/button";
import { router } from "expo-router";
import useConsentStore from "@/stores/consent.store";

const Consent = () => {
  const { setConsent } = useConsentStore();
  const items = [
    {
      icon: (
        <IconSymbol
          name="doc.text.fill"
          size={32}
          color={Colors.light.primary}
        />
      ),
      title: "Receipt Management",
      description:
        "Automatically get your receipts when you shop, both online and offline"
    },
    {
      icon: (
        <IconSymbol name="bell.fill" size={32} color={Colors.light.primary} />
      ),
      title: "Reclamation Alerts",
      description:
        "Get notified when your right to return or claim warranty is about to expire"
    },
    {
      icon: (
        <IconSymbol name="star.fill" size={32} color={Colors.light.primary} />
      ),
      title: "Loyalty Points",
      description:
        "Keep track of all your loyalty points in one place, no more separate apps needed"
    }
  ];

  React.useEffect(() => {
    setConsent(true);
  }, []);

  return (
    <View style={{ flex: 1, padding: 24 }}>
      <View
        style={{
          gap: 4,
          marginTop: 48
        }}
      >
        <Text style={{ fontSize: 32, fontWeight: "900" }}>Welcome to</Text>
        <Text
          style={{
            fontSize: 32,
            fontWeight: "900",
            color: Colors.light.primary
          }}
        >
          GLIPit.io
        </Text>
      </View>

      <View
        style={{
          flex: 1,
          gap: 32,
          paddingTop: 48
        }}
      >
        {items.map((item, index) => (
          <View
            key={index}
            style={{ flexDirection: "row", gap: 16, alignItems: "flex-start" }}
          >
            <View
              style={{
                width: 48,
                height: 48,
                borderRadius: 24,
                backgroundColor: Colors.light.primary + "10",
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              {item.icon}
            </View>
            <View style={{ gap: 4, flex: 1 }}>
              <Text style={{ fontSize: 18, fontWeight: "700" }}>
                {item.title}
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: "400",
                  flexWrap: "wrap",
                  color: "#666"
                }}
              >
                {item.description}
              </Text>
            </View>
          </View>
        ))}
      </View>

      <View style={{ gap: 16, marginBottom: 48 }}>
        <Text style={{ textAlign: "center", color: "#666" }}>
          By pressing continue, you agree to our{" "}
          <Text style={{ color: Colors.light.primary }}>Terms of Service</Text>{" "}
          and that you have read our{" "}
          <Text style={{ color: Colors.light.primary }}>Privacy Policy</Text>
        </Text>

        <Button
          variant="primary"
          onPress={() => {
            router.replace("/");
          }}
        >
          <Text style={{ color: "white", fontSize: 16, fontWeight: "600" }}>
            Continue
          </Text>
        </Button>
      </View>
    </View>
  );
};

export default Consent;
