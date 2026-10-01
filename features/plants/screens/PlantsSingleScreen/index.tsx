import ButtonBlock from '@/shared/components/Buttons/ButtonBlock';
import ScreenContainer from '@/shared/components/ScreenContainer';
import ScreenHeading from '@/shared/components/ScreenHeading';
import { plantsData } from '@/shared/constants/plants';
import { Link, useLocalSearchParams } from 'expo-router';
import { ScrollView, Text, View } from 'react-native';

export default function PlantsSingleScreen() {
  const {id} = useLocalSearchParams();
  const plant = plantsData.find(plant => plant.id === id);

  if (!plant) {
    return (
      <ScreenContainer>
        <Text>Plant not found.</Text>
      </ScreenContainer>
    );
  }

  return (
    <ScrollView style={{flexGrow: 1}} contentContainerStyle={{flexGrow: 1}}>
      <ScreenContainer>
        <ScreenHeading title={plant.name} />
        <View style={{marginBottom: 20}}>
          {plant.scientificName ? <Text>Scientific name: {plant.scientificName}</Text> : null}
          <Text>Color: {plant.color}</Text>
          <Text>Height: {plant.height}</Text>
          <Text>Width: {plant.width}</Text>
        </View>
        <Link
          href={{
            pathname: '/plants/edit',
            params: {id: plant.id }
          }}
          asChild>
          <ButtonBlock>
            <Text>Edit Plant</Text>
          </ButtonBlock>
        </Link>
      </ScreenContainer>
    </ScrollView>
  );
}
