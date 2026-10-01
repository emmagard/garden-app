import PlantListItem from '@/features/plants/components/PlantListItem';
import ButtonBlock from '@/shared/components/Buttons/ButtonBlock';
import Input from '@/shared/components/Input';
import InputSheetSelect from '@/shared/components/InputSheetSelect';
import ScreenContainer from '@/shared/components/ScreenContainer';
import ScreenHeading from '@/shared/components/ScreenHeading';
import { gardensData } from '@/shared/constants/gardens';
import { lightOptions } from '@/shared/constants/lightOptions';
import { plantsData } from '@/shared/constants/plants';
import { soilOptions } from '@/shared/constants/soilOptions';
import { colors } from '@/shared/styles/colors';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import AddPlantSheet from './components/AddPlantSheet';

export default function GardensEditScreen() {
  const {id} = useLocalSearchParams();
  const garden = gardensData.find(garden => garden.id === id);

  // Hooks must run before the early return below, so fall back to empty values.
  const [gardenName, setGardenName] = useState(garden?.name ?? '');
  const [gardenLight, setGardenLight] = useState(garden?.light ?? '');
  const [gardenSoil, setGardenSoil] = useState(garden?.soil ?? '');
  const [gardenLength, setGardenLength] = useState(garden?.length ?? '');
  const [gardenWidth, setGardenWidth] = useState(garden?.width ?? '');
  const [gardenPlantIds, setGardenPlantIds] = useState(garden?.plantIds ?? []);
  const [isAddPlantOpen, setIsAddPlantOpen] = useState(false);
  const router = useRouter();

  const handleSaveChanges = () => {
    if (garden) {
      // Handle saving changes to the garden
      console.log({
        id: garden.id,
        name: gardenName,
        light: gardenLight,
        soil: gardenSoil,
        length: gardenLength,
        width: gardenWidth,
        plantIds: gardenPlantIds,
      });

      // You would typically update the garden in your data store here
      // Then navigate back to the garden's detail page or show a success message.
      // dismissTo goes back to the single screen if it's underneath (opened from
      // there), otherwise replaces this screen with it (opened from the list).
      router.dismissTo({
        pathname: '/gardens/single',
        params: { id: garden.id }
      });
    }
  };    

  if (!garden) {
    return (
      <ScreenContainer>
        <Text>Garden not found.</Text>
      </ScreenContainer>
    );
  }

  const plants = plantsData.filter(plant => gardenPlantIds.includes(plant.id));
  const availablePlants = plantsData.filter(plant => !gardenPlantIds.includes(plant.id));

  return (

    <ScrollView style={{flexGrow: 1}} contentContainerStyle={{flexGrow: 1}}>
      <ScreenContainer>
        <ScreenHeading title={`Editting the ${garden.name}`} paddingBottom={30}/>
        <View style={{
          marginBottom: 30,
          flexDirection: 'column',
          gap: 20,
        }}>
            <Input
              label="Garden Name"
              value={gardenName} 
              onChangeText={(newVal) => {setGardenName(newVal)}} />
            <InputSheetSelect
              options={lightOptions}
              label="Light"
              value={gardenLight} 
              onChange={(newVal) => {setGardenLight(newVal)}} />
            <InputSheetSelect
              options={soilOptions}
              label="Soil"
              value={gardenSoil}
              onChange={(newVal) => {setGardenSoil(newVal)}} />
            <Input
              label="Length"
              labelPlacement={'above'}
              value={gardenLength}
              onChangeText={(newVal) => {setGardenLength(newVal)}} />
            <Input
              label="Width"
              labelPlacement={'above'}
              value={gardenWidth}
              onChangeText={(newVal) => {setGardenWidth(newVal)}} />
        </View>
        <View style={{
          flexDirection: 'row',
          gap: 20,
          marginBottom: 0,
          alignContent: 'center',
          alignItems: 'center' }}>
          <ScreenHeading title='Plants' level={2} paddingBottom={10} />
        </View>
        <View style={{gap: 12, marginBottom: 30}}>
          {plants.map((item) => (
            <PlantListItem
              plant={item}
              key={item.id}/>
          ))}
        </View>
        <ButtonBlock onPress={() => setIsAddPlantOpen(true)}>
          <Text>Add a Plant to Your Garden</Text>
        </ButtonBlock>
         <ButtonBlock onPress={handleSaveChanges} style={{backgroundColor: colors.blue, marginTop: 20}}>
          <Text>Save Changes</Text>
        </ButtonBlock>
        <AddPlantSheet
          visible={isAddPlantOpen}
          plants={availablePlants}
          onAdd={(plantIds) => setGardenPlantIds(ids => [...ids, ...plantIds])}
          onClose={() => setIsAddPlantOpen(false)} />
      </ScreenContainer>
    </ScrollView>
  );
}
