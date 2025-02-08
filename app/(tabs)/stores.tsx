import { View, Text, Animated } from "react-native";
import React from "react";
import Topbar from "@/components/topbar";

const StoresScreen = () => {
  const scrollY = React.useRef(new Animated.Value(0)).current;

  return (
    <View style={{ flex: 1 }}>
      <Topbar name="Stores" scrollY={scrollY} />
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
      >
        <Text>StoresScreen</Text>
      </Animated.ScrollView>
    </View>
  );
};

export default StoresScreen;
