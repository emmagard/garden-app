import ButtonLink from '@/shared/components/ButtonLink';
import ScreenContainer from '@/shared/components/ScreenContainer';
import ScreenHeading from '@/shared/components/ScreenHeading';
import { gardensData } from '@/shared/constants/gardens';
import { FlatList, Text } from 'react-native';
import GardenListItem from './components/GardenListItem';

const useGetGardens = () => {
  return gardensData;
};

export default function GardensScreen() {
  const gardens = useGetGardens();

  if (!gardens) { return false; }

  return (
    <ScreenContainer>
      <ScreenHeading title="Your Gardens" />

      { gardens.length === 0 ?
        <>
          <Text>You don't have any gardens.</Text>
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
