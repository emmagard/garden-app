import { Link, LinkProps } from "expo-router";
import { PressableProps } from "react-native";
import Button from '../ButtonInline';

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
      >
      <Button
        {...rest}
        disabled={isDisabled}
        style={{
          paddingHorizontal: sizeMap[size].ph,
          paddingVertical: sizeMap[size].pv,
        }}>
        {children}
      </Button>
    </Link>
  );
}