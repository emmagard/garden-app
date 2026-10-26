import GardenPlantList from '@/features/gardens/components/GardenPlantList';
import { useGarden } from '@/features/gardens/hooks/useGardens';
import { usePlants } from '@/features/plants/hooks/usePlants';
import ButtonBlock from '@/shared/components/Buttons/ButtonBlock';
import FormTopBar from '@/shared/components/FormTopBar';
import Input from '@/shared/components/Input';
import InputSheetSelect from '@/shared/components/InputSheetSelect';
import InputTitle from '@/shared/components/InputTitle';
import ScreenContainer from '@/shared/components/ScreenContainer';
import SmallCapsText from '@/shared/components/SmallCapsText';
import { lightOptions } from '@/shared/constants/lightOptions';
import { soilOptions } from '@/shared/constants/soilOptions';
import { colors } from '@/shared/styles/colors';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import { Text, View } from 'react-native';
import AddPlantSheet from './components/AddPlantSheet';

export default function GardensEditScreen() {
  const {id} = useLocalSearchParams<{ id: string }>();
  const garden = useGarden(id);
  const allPlants = usePlants();

  // Hooks must run before the early return below, so fall back to empty values.
  const [gardenName, setGardenName] = useState(garden?.name ?? '');
  const [gardenLight, setGardenLight] = useState(garden?.light ?? '');
  const [gardenSoil, setGardenSoil] = useState(garden?.soil ?? '');
  const [gardenLength, setGardenLength] = useState(garden?.length ?? '');
  const [gardenWidth, setGardenWidth] = useState(garden?.width ?? '');
  const [gardenPlantIds, setGardenPlantIds] = useState(garden?.plantIds ?? []);
  const [isAddPlantOpen, setIsAddPlantOpen] = useState(false);
  const router = useRouter();

  // dismissTo goes back to the single screen if it's underneath (opened from
  // there), otherwise replaces this screen with it (opened from the list).
  const goToGarden = () => {
    if (garden) {
      router.dismissTo({
        pathname: '/gardens/single',
        params: { id: garden.id }
      });
    }
  };

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
      goToGarden();
    }
  };

  if (!garden) {
    return (
      <ScreenContainer>
        <Text>Garden not found.</Text>
      </ScreenContainer>
    );
  }

  const plants = allPlants.filter(plant => gardenPlantIds.includes(plant.id));
  const availablePlants = allPlants.filter(plant => !gardenPlantIds.includes(plant.id));

  return (
    <ScreenContainer scroll>
      <FormTopBar
        title="edit record"
        onCancel={goToGarden}
        onSave={handleSaveChanges} />

      {/* Garden Details */}
      <View style={{
        paddingBottom: 12,
        marginBottom: 24,
        borderBottomWidth: 1,
        borderBottomColor: colors.black35,
        flexDirection: 'column',
        gap: 8,
      }}>
        <InputTitle
          label="garden name"
          value={gardenName}
          onChangeText={(newVal) => {setGardenName(newVal)}} />
        <View style={{flexDirection: 'row', gap: 10}}>
          <InputSheetSelect
            options={lightOptions}
            label="light"
            value={gardenLight}
            onChange={(newVal) => {setGardenLight(newVal)}} />
          <InputSheetSelect
            options={soilOptions}
            label="soil"
            value={gardenSoil}
            onChange={(newVal) => {setGardenSoil(newVal)}} />
          <Input
            label="plot dimensions"
            labelPlacement={'above'}
            value={gardenLength}
            onChangeText={(newVal) => {setGardenLength(newVal)}} />
        </View>
      </View>

      <GardenPlantList plants={plants} />

      <ButtonBlock
        onPress={() => setIsAddPlantOpen(true)}
        style={{
          borderWidth: 1,
          borderColor: colors.black35,
          marginTop: 20,
          marginBottom: 40 }}>
        <SmallCapsText size={13}>+ add a plant</SmallCapsText>
      </ButtonBlock>

      <AddPlantSheet
        visible={isAddPlantOpen}
        plants={availablePlants}
        onAdd={(plantIds) => setGardenPlantIds(ids => [...ids, ...plantIds])}
        onClose={() => setIsAddPlantOpen(false)} />
    </ScreenContainer>
  );
}
