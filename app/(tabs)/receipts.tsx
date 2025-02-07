import React from 'react'
import { View, Text } from "react-native"
import Topbar from "@/components/topbar"

const SearchScreen = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: "#F3F3F5" }}>
      <Topbar name="Receipts"/>
      <Text>SearchScreen</Text> 
    </View>
  )
}

export default SearchScreen