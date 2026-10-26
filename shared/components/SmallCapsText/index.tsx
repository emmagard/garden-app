import { colors } from '@/shared/styles/colors';
import { Text, TextProps, TextStyle } from 'react-native';

type SmallCapsTextProps = TextProps & {
  size?: number;
  color?: string;
};

export default function SmallCapsText({ size = 11, color = colors.ink, style, ...rest }: SmallCapsTextProps) {
  const defaultStyle: TextStyle = {
    fontSize: size,
    color,
    fontVariant: ['small-caps'],
  };

  return <Text style={style ? [defaultStyle, style] : defaultStyle} {...rest} />;
}
