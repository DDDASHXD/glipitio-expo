import React from "react";
import { View, Text, Animated, RefreshControl } from "react-native";
import Topbar from "@/components/topbar";
import RecentReceipts from "@/components/widgets/recent-receipts";
import { router } from "expo-router";

const SearchScreen = () => {
  const [refreshing, setRefreshing] = React.useState(false);
  const scrollY = React.useRef(new Animated.Value(0)).current;

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
    } catch (error) {
      console.error("Failed to refresh:", error);
    } finally {
      setRefreshing(false);
    }
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <Topbar name="Receipts" scrollY={scrollY} />
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
        <Text>ReceiptsScreen</Text>
      </Animated.ScrollView>
    </View>
  );
};

export default SearchScreen;
