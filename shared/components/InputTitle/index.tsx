import InputLabel from '@/shared/components/InputLabel';
import { colors } from '@/shared/styles/colors';
import { fonts } from '@/shared/styles/fonts';
import { TextInput, TextInputProps, TextStyle, View } from 'react-native';

interface InputTitleProps extends TextInputProps {
  label: string;
}

// A large text input in the heading font, for a record's name.
export default function InputTitle({ label, style, ...rest }: InputTitleProps) {
  const defaultStyle: TextStyle = {
    fontFamily: fonts.heading,
    fontSize: 20,
    borderWidth: 1,
    borderColor: colors.black35,
    backgroundColor: colors.paperLight,
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 8,
    color: colors.ink,
  };

  return (
    <View style={{ flexDirection: 'column', alignItems: 'stretch' }}>
      <InputLabel>{label}</InputLabel>
      <TextInput style={style ? [defaultStyle, style] : defaultStyle} {...rest} />
    </View>
  );
}
