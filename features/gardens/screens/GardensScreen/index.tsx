import { useGardens } from '@/features/gardens/hooks/useGardens';
import ButtonLink from '@/shared/components/Buttons/ButtonLink';
import ScreenContainer from '@/shared/components/ScreenContainer';
import ScreenHeading from '@/shared/components/ScreenHeading';
import { FlatList, Text } from 'react-native';
import GardenListItem from './components/GardenListItem';

export default function GardensScreen() {
  const gardens = useGardens();

  if (!gardens) { return false; }

  return (
    <ScreenContainer>
      <ScreenHeading title="Your Gardens"/>

      { gardens.length === 0 ?
        <>
          <Text>You don&apos;t have any gardens.</Text>
          <ButtonLink href="/gardens/new">
            <Text>Add a new garden to get started.</Text>
          </ButtonLink>
        </>
      :
        <FlatList
          data={gardens}
          renderItem={ ({item}) => <GardenListItem gardenName={item.name} gardenId={item.id} />}
          keyExtractor={item => item.id}
        />       
      }
    </ScreenContainer>
  );
}
