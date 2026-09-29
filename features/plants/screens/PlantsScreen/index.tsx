import ButtonLink from '@/shared/components/Buttons/ButtonLink';
import ScreenContainer from '@/shared/components/ScreenContainer';
import ScreenHeading from '@/shared/components/ScreenHeading';
import { plantsData } from '@/shared/constants/plants';
import { FlatList, Text } from 'react-native';

const useGetPlants = () => {
  return plantsData;
};

export default function PlantsScreen() {
  const plants = useGetPlants();

  return (
    <ScreenContainer>
      <ScreenHeading title="Your Plants" />
      { plants.length === 0 ?
        <>
          <Text>You don&apos;t have any plants.</Text>
          <ButtonLink href="/plants/new">
            <Text>Add a new plant to get started.</Text>
          </ButtonLink>
        </>
      :
        <FlatList
          data={plants}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Text>{item.name}</Text>
          )}
        />
      }
    </ScreenContainer>
  );
}
