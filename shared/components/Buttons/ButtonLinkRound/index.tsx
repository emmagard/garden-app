import { Link, LinkProps } from "expo-router";
import { PressableProps } from "react-native";
import Button from '../ButtonInline';

interface ButtonLinkRoundProps extends PressableProps {
  href: LinkProps['href'];
}

export default function ButtonLinkRound({ href, children, ...rest }: ButtonLinkRoundProps) {
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
          borderRadius: 100,
          paddingVertical: 8,
          paddingHorizontal: 8}}>
        {children}
      </Button>
    </Link>
  );
}