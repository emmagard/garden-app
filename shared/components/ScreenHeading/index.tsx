import { colors } from '@/shared/styles/colors';
import { Text, View } from 'react-native';

type ScreenHeadingProps = {
  title: string;
  level?: number;
  paddingBottom?: number;
}

const fontSizeMap: Record<number, number> = {
  1: 24,
  2: 18,
  3: 14,
  4: 12
};

export default function ScreenHeading({ title, level = 1, paddingBottom = 16}: ScreenHeadingProps) {
  return (
    <View style={{ paddingBottom: paddingBottom }}>
      <Text style={{ fontSize: fontSizeMap[level], fontWeight: 'bold', color: colors.dark }}>{title}</Text>
    </View>
  );
}