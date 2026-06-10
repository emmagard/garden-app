import ScreenContainer from '@/shared/components/ScreenContainer';
import ScreenHeading from '@/shared/components/ScreenHeading';
import { Text } from 'react-native';

export default function PlantsEditScreen() {
  return (
    <ScreenContainer>
      <ScreenHeading title={`Editting ${plantName}`} />
      <Text>You don't have any plants.</Text>
    </ScreenContainer>
  );
}
