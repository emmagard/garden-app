import useSession from '@/shared/store/useSession';
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
      <Tabs screenOptions={{headerShown: false}}>
        <Tabs.Screen name="index" options={{ title: 'Home' }} />
        <Tabs.Screen name="gardens" options={{ title: 'Gardens' }} />
        <Tabs.Screen name="plants" options={{title: 'Plants'}} />
        <Tabs.Screen name="account" options={{ title: 'Account' }} />
      </Tabs>
    );
  // }
}
