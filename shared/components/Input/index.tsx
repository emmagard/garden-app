import InputLabel from '@/shared/components/InputLabel';
import { colors } from '@/shared/styles/colors';
import { TextInput, TextInputProps, View } from "react-native";

interface InputProps extends TextInputProps {
  label: string;
  labelPlacement?: 'above' | 'beside';
};

export default function Input({ label, labelPlacement = 'above',  ...rest }: InputProps) {
  const defaultStyle = {
    borderWidth: 1,
    borderColor: colors.black35,
    backgroundColor: colors.paperLight,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 8,
    fontSize: 12,
    color: colors.ink
  };
  const style = rest.style ? [defaultStyle, rest.style] : defaultStyle;
  
  const containerStyle = {
    flexDirection: labelPlacement == 'above' ? 'column' : 'row',
    alignItems: labelPlacement == 'above' ? 'stretch' : 'baseline',
    flex: 0,
  } as const;
  
  return (
    <View style={containerStyle}>
      <InputLabel>{label}</InputLabel>
      <TextInput
        style={style}
        {...rest}
      />
    </View>
  );
}