import { Stack } from 'expo-router';
import React from 'react';

export default function GardensLayout() {
  return (
    <Stack screenOptions={{ headerShown: false, contentStyle: {backgroundColor: '#ffffff'} }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="edit" />
      <Stack.Screen name="add-plant" />
      <Stack.Screen name="new" />
      <Stack.Screen name="single" />
    </Stack>
  );
}