import { colors } from '@/shared/styles/colors';
import { Pressable, PressableProps } from "react-native";

export default function ButtonInline({ children, ...rest }: PressableProps) {
  const isDisabled = rest.disabled;
  const defaultStyle = {
    backgroundColor: colors.greenBright,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    opacity: isDisabled ? 0.5 : 1
  };
  
  const style = rest.style ? [defaultStyle, rest.style] : defaultStyle;
  
  return (
    <Pressable
      {...rest}
      disabled={isDisabled}
      style={style as PressableProps['style']}>
      {children}
    </Pressable>
  );
}