import { Text, TextInput, TextInputProps, View } from "react-native";

interface InputProps extends TextInputProps {
  label: string;
  labelPlacement?: 'above' | 'beside';
};

export default function Input({ label, labelPlacement = 'above',  ...rest }: InputProps) {
  const defaultStyle = {
    border: 'solid',
    borderWidth: 1,
    borderColor: '#d0d2d0',
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    flexGrow: 2
  };
  const style = rest.style ? [defaultStyle, rest.style] : defaultStyle;
  
  const containerStyle = {
    flexDirection: labelPlacement == 'above' ? 'column' : 'row',
    alignItems: labelPlacement == 'above' ? 'stretch' : 'baseline',
  } as const;

  const labelStyle = {
    marginRight: 10
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