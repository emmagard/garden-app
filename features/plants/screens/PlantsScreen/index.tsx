import ButtonLink from '@/shared/components/ButtonLink';
import ScreenContainer from '@/shared/components/ScreenContainer';
import ScreenHeading from '@/shared/components/ScreenHeading';
import { Text } from 'react-native';

export default function PlantsScreen() {
  return (
    <ScreenContainer>
      <ScreenHeading title="Your Plants" />
      <Text>You don't have any plants.</Text>
      <ButtonLink href="/plants/new">
        <Text>Add a new plant to get started.</Text>
      </ButtonLink>
    </ScreenContainer>
  );
}
