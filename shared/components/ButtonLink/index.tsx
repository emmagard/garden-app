import { Link, LinkProps } from "expo-router";
import { Pressable, PressableProps } from "react-native";

interface ButtonLinkProps extends PressableProps {
  size?: 'small'|'medium'|'large';
  href: LinkProps['href'];
}

const sizeMap = {
  'small': {
    pv: 6,
    ph: 16
  },
  'medium': {
    pv: 10,
    ph: 20
  },
  'large': {
    pv: 14,
    ph: 24
  }
};

export default function ButtonLink({ size = 'medium', href, children, ...rest }: ButtonLinkProps) {
   if (!href) {
    console.warn("ButtonLink requires an href prop");
    return null;
  }

  const isDisabled = rest.disabled ? true : false;

  return (
    <Link
      href={href}
      disabled={isDisabled}
      asChild
      style={{
        alignSelf: 'flex-start', 
        backgroundColor: '#BDD4E5',
        paddingVertical: sizeMap[size].pv,
        paddingHorizontal: sizeMap[size].ph,
        borderRadius: 8,
        opacity: isDisabled ? 0.5 : 1,
      }}>
      <Pressable {...rest} disabled={isDisabled}>
        {children}
      </Pressable>
    </Link>
  );
}