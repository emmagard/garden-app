import { colors } from '@/shared/styles/colors';
import { Pressable, PressableProps } from "react-native";

export default function ButtonInline({ children, ...rest }: PressableProps) {
  const isDisabled = rest.disabled;
  const defaultStyle = {
    backgroundColor: colors.paperLight,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: colors.black35,
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