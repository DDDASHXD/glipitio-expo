import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import React from "react";
import useAuthStore from "@/stores/auth.store";
import Button from "../ui/button";
import { IconSymbol } from "../ui/IconSymbol";
import { Pressable } from "react-native-gesture-handler";
import { strapiClient } from "@/lib/strapi";
import { config } from "@/lib/config";
import { useRecentReceipts } from "@/stores/receipts.store";
import { router } from "expo-router";

export interface ReceiptItem {
  __component: "shared.receipt-item";
  id: number;
  name: string;
  price: number;
  valuta: string;
}

export interface ImageFormat {
  name: string;
  hash: string;
  ext: string;
  mime: string;
  path: null;
  width: number;
  height: number;
  size: number;
  sizeInBytes?: number;
  url: string;
}

export interface Media {
  id: number;
  documentId: string;
  name: string;
  alternativeText: null;
  caption: null;
  width: number;
  height: number;
  formats: {
    thumbnail: ImageFormat;
    small: ImageFormat;
    medium?: ImageFormat;
    large?: ImageFormat;
  };
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl: null;
  provider: string;
  provider_metadata: null;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface Store {
  createdAt: string;
  description: any;
  documentId: string;
  id: number;
  name: string;
  publishedAt: string;
  updatedAt: string;
  logo: Media;
  cover: Media;
}

export interface User {
  blocked: boolean;
  confirmed: boolean;
  createdAt: string;
  documentId: string;
  email: string;
  id: number;
  name: string;
  provider: string;
  publishedAt: string;
  updatedAt: string;
  username: string;
}

export interface Receipt {
  createdAt: string;
  documentId: string;
  id: number;
  items: ReceiptItem[];
  publishedAt: string;
  store: Store;
  updatedAt: string;
  user: User;
}

const RecentReceipts = () => {
  const { user } = useAuthStore();
  const { receipts, isLoading, error } = useRecentReceipts(user?.id || 0);

  if (isLoading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text>Error loading receipts</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.header}
        onPress={() => {
          router.push("/(tabs)/receipts");
        }}
      >
        <Text style={styles.title}>Latest receipts</Text>
        <IconSymbol name="chevron.right" size={12} color="rgba(0, 0, 0, 0.5)" />
      </TouchableOpacity>
      {receipts?.map((receipt, index) => {
        return (
          <TouchableOpacity key={receipt.id} onPress={() => {}}>
            <View style={styles.receipt}>
              <View style={styles.logo}>
                <Image
                  source={{
                    uri: `${config.STRAPI_URL}${receipt.store.logo.url}`
                  }}
                  style={styles.logoImage}
                />
                <View style={styles.receiptInfo}>
                  <Text style={styles.storeName}>{receipt.store.name}</Text>
                  <Text style={styles.date}>
                    {new Date(receipt.createdAt).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: true
                    })}
                  </Text>
                </View>
              </View>
              <Text style={styles.amount}>
                -
                {receipt.items
                  .reduce((acc, item) => acc + item.price, 0)
                  .toFixed(2)}{" "}
                kr.
              </Text>
            </View>
            {index !== receipts.length - 1 && <View style={styles.separator} />}
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    paddingHorizontal: 16,
    paddingVertical: 18,
    borderRadius: 16
  },
  title: {
    fontSize: 14,
    fontWeight: "600",
    color: "rgba(0, 0, 0, 0.5)"
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10
  },
  receipt: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 16
  },
  receiptInfo: {
    flexDirection: "column",
    justifyContent: "center",
    gap: 4
  },
  separator: {
    height: 1,
    backgroundColor: "rgba(0, 0, 0, 0.05)"
  },
  logo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12
  },
  logoImage: {
    width: 40,
    height: 40,
    borderRadius: 9999
  },
  storeName: {
    fontSize: 16,
    fontWeight: "500",
    color: "#000"
  },
  date: {
    fontSize: 14,
    color: "#666"
  },
  amount: {
    fontSize: 16,
    fontWeight: "500",
    color: "#000"
  }
});

export default RecentReceipts;
