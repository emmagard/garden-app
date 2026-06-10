import ButtonLink from '@/shared/components/ButtonLink';
import LinkList from '@/shared/components/LinkList';
import ScreenContainer from '@/shared/components/ScreenContainer';
import ScreenHeading from '@/shared/components/ScreenHeading';
import useSession from '@/shared/store/useSession';
import { Text } from 'react-native';

export default function AccountScreen() {
  const { user } = useSession();

  return (
    <ScreenContainer>
      <ScreenHeading title="Your Account" />
      <Text>Welcome {user.name}</Text>
      <LinkList>
        <ButtonLink href="/account/edit">
          <Text>Edit Your Account</Text>
        </ButtonLink>
      </LinkList>
    </ScreenContainer>
  );
}