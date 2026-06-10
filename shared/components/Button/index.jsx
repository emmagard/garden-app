import { Pressable } from "react-native";


export default function Button({ children, ...rest }) {
  const defaultStyle = {
    alignSelf: 'flex-start',   alignSelf: 'flex-start', 
    backgroundColor: '#BDD4E5',
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    opacity: isDisabled ? 0.5 : 1
  };
  const isDisabled = rest.disabled;
  const style = rest.style ? [defaultStyle, rest.style] : defaultStyle;
  
  return (
    <Pressable
      {...rest}
      disabled={isDisabled}
      style={style}>
      {children}
    </Pressable>
  );
}