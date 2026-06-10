import LinkList from '@/shared/components/LinkList';
import ScreenContainer from '@/shared/components/ScreenContainer';
import ScreenHeading from '@/shared/components/ScreenHeading';
import { Link } from 'expo-router';

export default function LoginScreen() {
  return (
    <ScreenContainer>
      <ScreenHeading title="Login Screen" />
      <LinkList>
        <Link href="/signup">Sign up</Link>
      </LinkList>
    </ScreenContainer>
  );
}
