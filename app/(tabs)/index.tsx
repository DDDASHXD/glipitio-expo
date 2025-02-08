import { router } from "expo-router";
import React from "react";
import { View, Text, ScrollView, Animated, RefreshControl } from "react-native";
import Button from "@/components/ui/button";
import Topbar from "@/components/topbar";
import RecentReceipts from "@/components/widgets/recent-receipts";
import useAuthStore from "@/stores/auth.store";
import { useRecentReceipts } from "@/stores/receipts.store";

const HomeScreen = () => {
  const scrollY = React.useRef(new Animated.Value(0)).current;
  const [refreshing, setRefreshing] = React.useState(false);
  const { user } = useAuthStore();
  const { refresh } = useRecentReceipts(user?.id || 0);

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    try {
      await refresh();
      await new Promise((resolve) => setTimeout(resolve, 1000));
    } catch (error) {
      console.error("Failed to refresh:", error);
    } finally {
      setRefreshing(false);
    }
  }, [refresh]);

  return (
    <View style={{ flex: 1 }}>
      <Topbar name="Home" scrollY={scrollY} />
      <Animated.ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{
          paddingTop: 120,
          paddingBottom: 120,
          paddingHorizontal: 24,
          gap: 8
        }}
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
        scrollEventThrottle={16}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor="#000"
            progressViewOffset={120}
          />
        }
      >
        <RecentReceipts />
      </Animated.ScrollView>
    </View>
  );
};

export default HomeScreen;
