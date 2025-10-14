import { Tabs } from 'expo-router';
import React from 'react';

import { HapticTab } from '@/components/haptic-tab';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import {MaterialIcons,Ionicons, FontAwesome , Feather} from '@expo/vector-icons';


export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        tabBarButton: HapticTab,
      }}>


      <Tabs.Screen
        name="index"
        options={{
          title: 'All-Blog',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
        }}
      />
      

      <Tabs.Screen
        name="bookmarkTab"
        options={{
          title: 'Bookmark',
          tabBarIcon:({color})=> <Ionicons name="bookmark" size={24} color={color} />
        }}
      />

      <Tabs.Screen
        name="newPostTab"
        options={{
          title: 'New-Post',
          tabBarIcon:({color})=> <MaterialIcons name="add" size={24} color={color} />
        }}
      />

      <Tabs.Screen
        name="userProfileTab"
        options={{
          title: 'Profile',
          tabBarIcon:({color})=> <Feather name="user" size={24} color={color} />
        }}
      />
    </Tabs>
  );
}
