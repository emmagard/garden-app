import React from 'react';

import { Stack } from 'expo-router';

export default function AccountLayout() {
  return (
    <Stack screenOptions={{ headerShown: false, contentStyle: {backgroundColor: '#ffffff'} }}>
      <Stack.Screen name="index"/>
      <Stack.Screen name="edit" />
    </Stack>
  );
}