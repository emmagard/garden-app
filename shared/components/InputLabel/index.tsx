import SmallCapsText from '@/shared/components/SmallCapsText';
import { colors } from '@/shared/styles/colors';
import { TextProps, TextStyle } from 'react-native';

export default function InputLabel({ style, ...rest }: TextProps) {
  const defaultStyle: TextStyle = {
    fontWeight: '500',
    marginRight: 10,
    marginBottom: 2
  };

  return (
    <SmallCapsText
      size={12}
      color={colors.greenDark}
      style={style ? [defaultStyle, style] : defaultStyle}
      {...rest} />
  );
}
