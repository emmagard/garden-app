import { colors } from '@/shared/styles/colors';
import { Text, TextInput, TextInputProps, View } from "react-native";

interface InputProps extends TextInputProps {
  label: string;
  labelPlacement?: 'above' | 'beside';
};

export default function Input({ label, labelPlacement = 'above',  ...rest }: InputProps) {
  const defaultStyle = {
    border: 'solid',
    backgroundColor: colors.white,
    borderWidth: 0,
    padding: 12,
    borderRadius: 8,
  };
  const style = rest.style ? [defaultStyle, rest.style] : defaultStyle;
  
  const containerStyle = {
    flexDirection: labelPlacement == 'above' ? 'column' : 'row',
    alignItems: labelPlacement == 'above' ? 'stretch' : 'baseline',
  } as const;

  const labelStyle = {
    fontWeight: 'bold',
    fontSize: 18,
    color: colors.dark,
    marginRight: 10,
    marginBottom: 10
  };
  
  return (
    <View style={containerStyle}>
      <Text style={labelStyle}>{label}</Text>
      <TextInput
        style={style}
        {...rest}
      />
    </View>
  );
}