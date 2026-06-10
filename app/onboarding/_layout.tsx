import useSession from '@/shared/store/useSession';
import { Stack } from 'expo-router';
import React from 'react';

export default function OnboardingLayout() {
  const { isAuthenticated, hasCompletedOnboarding } = useSession();
  const shouldCompleteOnboarding = isAuthenticated && !hasCompletedOnboarding;

  if (shouldCompleteOnboarding) {
    return (
      <Stack screenOptions={{ headerShown: true, contentStyle: {backgroundColor: '#ffffff'}  }}>
        <Stack.Screen name="index" options={{ title: "Onboarding" }} />
      </Stack>
    );
  }
}