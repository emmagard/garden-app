import GardenPlantList from '@/features/gardens/components/GardenPlantList';
import { useGarden } from '@/features/gardens/hooks/useGardens';
import { usePlants } from '@/features/plants/hooks/usePlants';
import ActionBar from '@/shared/components/ActionBar';
import ActionBarTitle from '@/shared/components/ActionBar/ActionBarTitle';
import ActionButton from '@/shared/components/ActionBar/ActionButton';
import ButtonBlock from '@/shared/components/Buttons/ButtonBlock';
import ScreenContainer from '@/shared/components/ScreenContainer';
import SmallCapsText from '@/shared/components/SmallCapsText';
import { colors } from '@/shared/styles/colors';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import { Text } from 'react-native';
import GardenForm, { emptyGardenFormValues } from '../../components/GardenForm';
import AddPlantSheet from './components/AddPlantSheet';

export default function GardensEditScreen() {
  const {id} = useLocalSearchParams<{ id: string }>();
  const garden = useGarden(id);
  const allPlants = usePlants();

  // Hooks must run before the early return below, so fall back to empty values.
  const [gardenValues, setGardenValues] = useState(garden ?? emptyGardenFormValues);
  const [gardenPlantIds, setGardenPlantIds] = useState(garden?.plantIds ?? []);
  const [isAddPlantOpen, setIsAddPlantOpen] = useState(false);
  const router = useRouter();

  // dismissTo goes back to the single screen if it's underneath (opened from
  // there), otherwise replaces this screen with it (opened from the list).
  const handleCancel = () => {
    if (garden) {
      router.dismissTo({
        pathname: '/gardens/single',
        params: { id: garden.id }
      });
    }
  };

  const handleSave= () => {
    if (garden) {
      // Handle saving changes to the garden
      console.log(
        gardenValues,
        gardenPlantIds,
      );

      // You would typically update the garden in your data store here
      // Then navigate back to the garden's detail page or show a success message.
      handleCancel();
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
      <ActionBar>
        <ActionButton label="cancel" onPress={handleCancel} />
        <ActionBarTitle title="edit record" />
        <ActionButton label="save" onPress={handleSave} />
      </ActionBar>

      <GardenForm
        values={gardenValues}
        onChange={setGardenValues}
      />

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
