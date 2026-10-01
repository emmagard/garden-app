import useSession from '@/shared/store/useSession';
import { colors } from '@/shared/styles/colors';
import { fonts } from '@/shared/styles/fonts';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
export const unstable_settings = {
  anchor: '(tabs)',
};

// Keep the splash screen up until custom fonts have loaded.
SplashScreen.preventAutoHideAsync();
// Expo Router docs: https://docs.expo.dev/router/basics/core-concepts/

/**
 * The root layout is a shared component that wraps all the pages in your app.
 * You can use this to keep state when navigating between pages, or to add a layout
 * that has to be on every page. (You can add shared UI like a navigation bar here, too)
 *
 * The `Stack` component displays nested `Screen`s and should be used for any screen
 * that should be able to navigate to other screens. The `Tabs` component displays
 * child `Screen`s in tabs and should be used for top-level navigation.
 *
 * https://expo.github.io/router/docs/routing/restoring-and-persisting-state
 */
export default function RootLayout() {
  const { isAuthenticated, hasCompletedOnboarding } = useSession();
  const shouldCompleteOnboarding = isAuthenticated && !hasCompletedOnboarding;
  const [fontsLoaded, fontError] = useFonts({
    [fonts.heading]: require('@/assets/SpecialGothicExpandedOne-Regular.ttf'),
  });

  useEffect(() => {
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  // If the font fails to load, carry on with the system font rather than blocking the app.
  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{flex: 1}}>
    <Stack screenOptions={{ headerShown: false, contentStyle: {backgroundColor: colors.light} }}>
      <Stack.Protected guard={!isAuthenticated}>
        <Stack.Screen name="(auth)" />
      </Stack.Protected>
      <Stack.Protected guard={shouldCompleteOnboarding}>
        <Stack.Screen name="onboarding" />
      </Stack.Protected>
      <Stack.Protected guard={isAuthenticated && hasCompletedOnboarding}>
        <Stack.Screen name="(tabs)" />
      </Stack.Protected>
    </Stack>
    </GestureHandlerRootView>
  )
}