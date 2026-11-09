import { colors } from '@/shared/styles/colors';
import React from 'react';
import { View } from 'react-native';

export default function RuledList({ children }: { children: React.ReactNode }) {
  return (
    <View style={{
      marginBottom: 30,
      borderTopWidth: 1,
      borderColor: colors.black35
    }}>
      {children}

      {/* Vertical margin rule, measured against the list only so it starts below
          the heading. Comes after the rows so it draws on top of their paper
          background; pointerEvents 'none' lets taps reach the rows. */}
      <View style={{
        position: 'absolute',
        top: -4,
        bottom: -4,
        left: 32,
        width: 1,
        backgroundColor: colors.fadedRed,
        pointerEvents: 'none',
      }} />
    </View>
  );
}