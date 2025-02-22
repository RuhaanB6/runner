import { useEffect, useState } from 'react';
import { Tabs } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import * as SplashScreen from 'expo-splash-screen';

SplashScreen.preventAutoHideAsync(); // Prevent auto-hide of splash screen

export default function TabLayout() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const loadApp = async () => {
      await new Promise(resolve => setTimeout(resolve, 1100)); // Delay for 3 seconds
      await SplashScreen.hideAsync(); // Hide splash screen after delay
      setIsReady(true); // App is now ready
    };

    loadApp();
  }, []);

  if (!isReady) {
    return null; // Keep splash screen visible until ready
  }

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#ffd33d',
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'home-sharp' : 'home-outline'} color={color} size={24} />
          ),
        }}
      />
      <Tabs.Screen
        name="about"
        options={{
          title: 'About',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'information-circle' : 'information-circle-outline'} color={color} size={24}/>
          ),
        }}
      />
    </Tabs>
  );
}
