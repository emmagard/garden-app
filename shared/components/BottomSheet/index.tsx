import { colors } from '@/shared/styles/colors';
import { ReactNode, useEffect, useRef, useState } from 'react';
import { Animated, Modal, Pressable, StyleSheet, useWindowDimensions } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';

type BottomSheetProps = {
  visible: boolean;
  onClose: () => void;
  // Called once the sheet has finished animating closed, e.g. to reset state or navigate away.
  onClosed?: () => void;
  children: ReactNode;
};

export default function BottomSheet({ visible, onClose, onClosed, children }: BottomSheetProps) {
  // Keep the modal mounted after `visible` turns false so the exit animation can play.
  const [isMounted, setIsMounted] = useState(visible);
  const sheetAnim = useRef(new Animated.Value(0)).current;
  const backdropAnim = useRef(new Animated.Value(0)).current;
  const { height: windowHeight } = useWindowDimensions();
  // Read the latest callback when the animation ends without re-running the effect.
  const onClosedRef = useRef(onClosed);
  useEffect(() => {
    onClosedRef.current = onClosed;
  }, [onClosed]);

  useEffect(() => {
    if (visible) {
      setIsMounted(true);
      // Slide the sheet up while fading the background into the overlay.
      Animated.parallel([
        Animated.timing(sheetAnim, { toValue: 1, duration: 250, useNativeDriver: true }),
        Animated.timing(backdropAnim, { toValue: 1, duration: 200, useNativeDriver: true }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(backdropAnim, { toValue: 0, duration: 150, useNativeDriver: true }),
        Animated.timing(sheetAnim, { toValue: 0, duration: 200, useNativeDriver: true }),
      ]).start(() => {
        setIsMounted(false);
        onClosedRef.current?.();
      });
    }
  }, [visible, sheetAnim, backdropAnim]);

  const sheetTranslateY = sheetAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [windowHeight, 0],
  });

  return (
    <Modal
      visible={isMounted}
      transparent={true}
      animationType="none"
      onRequestClose={onClose}
    >
      {/* Modals render outside the app's root view, so gestures need their own root (Android). */}
      <GestureHandlerRootView style={{flex: 1}}>
      <Animated.View style={[StyleSheet.absoluteFill, {backgroundColor: colors.black35, opacity: backdropAnim}]}>
        <Pressable
          onPress={onClose}
          accessibilityLabel="Close"
          style={StyleSheet.absoluteFill} />
      </Animated.View>
      <Animated.View
        pointerEvents="box-none"
        style={{flex: 1, justifyContent: 'flex-end', transform: [{ translateY: sheetTranslateY }]}}
      >
        <Animated.View style={{
          backgroundColor: colors.light,
          borderTopLeftRadius: 16,
          borderTopRightRadius: 16,
          maxHeight: '70%',
        }}>
          <SafeAreaView edges={['bottom']} style={{padding: 20, gap: 16}}>
            {children}
          </SafeAreaView>
        </Animated.View>
      </Animated.View>
      </GestureHandlerRootView>
    </Modal>
  );
}
