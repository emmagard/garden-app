import { colors } from '@/shared/styles/colors';
import { fonts } from '@/shared/styles/fonts';
import { Text, View } from 'react-native';

type ScreenHeadingProps = {
  title: string;
  level?: number;
  paddingBottom?: number;
}

const fontSizeMap: Record<number, number> = {
  1: 36,
  2: 22,
  3: 18,
  4: 14
};

export default function ScreenHeading({ title, level = 1, paddingBottom = 16}: ScreenHeadingProps) {
  return (
    <View style={{ paddingBottom: paddingBottom }}>
      <Text style={{ fontSize: fontSizeMap[level], fontFamily: fonts.heading, color: colors.dark, fontWeight: 500 }}>{title}</Text>
    </View>
  );
}