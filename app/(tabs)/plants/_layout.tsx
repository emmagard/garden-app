import { Stack } from 'expo-router';
import React from 'react';

// Keep the plants list underneath other plant screens, even when one is
// opened directly (e.g. /plants/new from the garden edit screen).
export const unstable_settings = {
  initialRouteName: 'index',
};

export default function PlantsLayout() {
  return (
    <Stack screenOptions={{ headerShown: false, contentStyle: {backgroundColor: '#ffffff'}  }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="edit" />
      <Stack.Screen name="new" />
      <Stack.Screen name="single" />
    </Stack>
  );
}