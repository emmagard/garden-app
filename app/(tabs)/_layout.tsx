import useSession from '@/shared/store/useSession';
import { colors } from '@/shared/styles/colors';
import AntDesign from '@expo/vector-icons/AntDesign';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { Tabs } from 'expo-router';
import React from 'react';

export const unstable_settings = {
  initialRouteName: 'index',
};

// Possible todo: apply platform-specific tabs (e.g. a stack on web, and bottom tabs on mobile)
// https://docs.expo.dev/router/basics/navigation-layouts/#platform-specific-tabs
export default function MainTabs() {
  const { isAuthenticated, hasCompletedOnboarding } = useSession();
  const shouldCompleteOnboarding = isAuthenticated && !hasCompletedOnboarding;

  // if (isAuthenticated && hasCompletedOnboarding) {
    return (
      <Tabs screenOptions={{
        headerShown: false, 
        tabBarStyle: {
          backgroundColor: colors.white,
          borderTopWidth: 1,
          borderTopColor: colors.greenMid
        },
        tabBarActiveTintColor: colors.dark,
        tabBarInactiveTintColor: colors.dark1}}>
        <Tabs.Screen name="index" options={{ title: 'Home', tabBarIcon: ({ color }) => <MaterialCommunityIcons name="home" size={28} color={color} />}} />
        <Tabs.Screen name="gardens" options={{ title: 'Gardens', tabBarIcon: ({ color }) => <AntDesign name="layout" size={24} color={color} />  }} />
        <Tabs.Screen name="plants" options={{title: 'Plants', tabBarIcon:({color}) => <MaterialCommunityIcons name="flower" size={26} color={color} /> }} />
        <Tabs.Screen name="account" options={{ title: 'Account', tabBarIcon: ({color}) => <MaterialCommunityIcons name="account" size={30} color={color} />  }} />
      </Tabs>
    );
  // }
}
