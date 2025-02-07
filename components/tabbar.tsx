import React from 'react'
import { View, Text, StyleSheet, Vibration } from "react-native"

import { Ionicons } from '@expo/vector-icons'
import { Link, LinkProps, usePathname } from "expo-router"
import * as Haptics from 'expo-haptics';
import { IconSymbol, type IconSymbolName } from "./ui/IconSymbol";

 const TabBarItem = ({ name, activeName, label, href }: { name: IconSymbolName, activeName: IconSymbolName, label: string, href: LinkProps['href'] }) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  const color = isActive ? '#000000' : '#8E8E93';

  return (
    <Link 
      href={href} 
      replace
      onPress={() => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Soft);
        console.log(`Clicked ${label} tab`);
      }}
      style={item.container}
    >
      <View style={item.content}>
        <IconSymbol 
          name={isActive ? activeName : name}
          size={24} 
          color={color} 
        />
        <Text style={{ 
          color,
          marginTop: 4,
          fontSize: 12,
        }}>
          {label}
        </Text>
      </View>
    </Link>
  )
}

const TabBar = () => {
  return (
    <View style={styles.container}>
      <TabBarItem name="house" activeName="house.fill" label="Home" href="/" />
      <TabBarItem name="ticket" activeName="ticket.fill" label="Receipts" href="/receipts" />
      <TabBarItem name="heart" activeName="heart.fill" label="Favorites" href="/favorites" />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    width: '100%',
    paddingVertical: 15,
  }
})

const item = StyleSheet.create({
  container: {
    flex: 1,
    height: 60,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    fontSize: 5,
  }
})
  
export default TabBar