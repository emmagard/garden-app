import { colors } from '@/shared/styles/colors';
import { View } from 'react-native';

const isWhite = (color: string) => ['#FFFFFF', '#FFF', 'WHITE'].includes(color.toUpperCase());

export default function ColorDot({ color, size = 22 }: { color: string; size?: number }) {
  return (
    <View style={{
      width: size,
      height: size,
      borderRadius: size / 2,
      backgroundColor: color,
      // Outline white so it stays visible against light backgrounds. The border is
      // always there (transparent otherwise) so every dot is the same size.
      borderWidth: 1,
      borderColor: isWhite(color) ? colors.dark1 : 'transparent',
    }} />
  );
}
