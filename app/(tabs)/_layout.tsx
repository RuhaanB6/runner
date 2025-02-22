import { useEffect, useState } from 'react';
import { Tabs } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useTheme } from '../lib/theme/useTheme';

import * as SplashScreen from 'expo-splash-screen';

SplashScreen.preventAutoHideAsync();

export default function TabLayout() {
  const { theme } = useTheme();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const loadApp = async () => {
      await new Promise(resolve => setTimeout(resolve, 1100));
      await SplashScreen.hideAsync();
      setIsReady(true);
    };

    loadApp();
  }, []);

  if (!isReady) {
    return null;
  }

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: theme.text,
        headerStyle: { backgroundColor: theme.tabBarBackground},
        headerShadowVisible: false,
        headerTintColor: "fff",
        tabBarStyle: {
          backgroundColor: theme.tabBarBackground,
          height: 85,
          borderTopWidth: 0,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarLabelStyle: {
            fontSize: 12,
            color: theme.tabBarInactiveTintColor,
          },
          headerTitleStyle: {
            color: theme.text
          },
          tabBarIcon: ({ focused }) => (
            <Ionicons
            name = {focused ? 'home-sharp' : 'home-outline'}
            color={focused ? theme.tabBarActiveTintColor : theme.tabBarInactiveTintColor}
            size={30}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="about"
        options={{
          title: 'About',
          tabBarLabelStyle: {
            color: theme.tabBarInactiveTintColor,
          },
          headerTitleStyle: {
            fontSize: 12,
            color: theme.text
          },
          tabBarIcon: ({ focused }) => (
            <Ionicons
            name = {focused ? 'information-circle' : 'information-circle-outline'}
            color={focused ? theme.tabBarActiveTintColor : theme.tabBarInactiveTintColor}
            size={30}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarLabelStyle: {
            fontSize: 12,
            color: theme.tabBarInactiveTintColor,
          },
          headerTitleStyle: {
            color: theme.text
          },
          tabBarIcon: ({ focused }) => (
            <Ionicons
            name = {focused ? 'person-circle-sharp' : 'person-circle-outline'}
            color={focused ? theme.tabBarActiveTintColor : theme.tabBarInactiveTintColor}
            size={30}
            />
          ),
        }}
      />
    </Tabs>
  );
}