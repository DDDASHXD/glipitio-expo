import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import useAuthStore from "@/stores/auth.store";
import Button from "../ui/button";
import { IconSymbol } from "../ui/IconSymbol";
import { Pressable } from "react-native-gesture-handler";
import { strapiClient } from "@/lib/strapi";

export interface ReceiptItem {
  __component: "shared.receipt-item";
  id: number;
  name: string;
  price: number;
  valuta: string;
}

export interface Store {
  createdAt: string;
  description: any;
  documentId: string;
  id: number;
  name: string;
  publishedAt: string;
  updatedAt: string;
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
  const [receipts, setReceipts] = React.useState<Receipt | null>(null);

  const getReceipts = async () => {
    try {
      const { data } = await strapiClient.get<{ data: Receipt[] }>(
        "/receipts",
        {
          populate: "*",
          filters: {
            user: {
              id: {
                $eq: user?.id
              }
            }
          }
        }
      );
      setReceipts(data[0]);
    } catch (error) {
      console.error("Failed to fetch receipts:", error);
      setReceipts([]);
    }
  };

  React.useEffect(() => {
    getReceipts();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Recent Receipts</Text>
        <TouchableOpacity onPress={() => {}}>
          <IconSymbol name="chevron.right" size={12} color="gray" />
        </TouchableOpacity>
      </View>
      <Text>{JSON.stringify(receipts)}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 16,
    borderRadius: 16
  },
  title: {
    fontSize: 12,
    fontWeight: "normal",
    color: "gray"
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  }
});

export default RecentReceipts;
