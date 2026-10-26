import PlantListItem from '@/features/plants/components/PlantListItem';
import { usePlants } from '@/features/plants/hooks/usePlants';
import ButtonLink from '@/shared/components/Buttons/ButtonLink';
import ScreenContainer from '@/shared/components/ScreenContainer';
import ScreenHeading from '@/shared/components/ScreenHeading';
import { FlatList, Text } from 'react-native';

export default function PlantsScreen() {
  const plants = usePlants();

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
            <PlantListItem
              plant={item}
              key={item.id}/>
          )}
        />
      }
    </ScreenContainer>
  );
}
