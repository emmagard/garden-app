import { colors } from '@/shared/styles/colors';
import { Text, TextProps, TextStyle } from 'react-native';

export default function InputLabel({ style, children, ...rest }: TextProps) {
  const defaultStyle: TextStyle = {
    fontSize: 12,
    fontWeight: '500',
    fontVariant: ['small-caps'],
    color: colors.greenDark,
    marginRight: 10,
    marginBottom: 2
  };

  return (
    <Text style={style ? [defaultStyle, style] : defaultStyle} {...rest}>
      {children}
    </Text>
  );
}
