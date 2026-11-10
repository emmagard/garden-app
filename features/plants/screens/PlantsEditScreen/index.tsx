import PlantForm, { emptyPlantFormValues } from '@/features/plants/components/PlantForm';
import { usePlant } from '@/features/plants/hooks/usePlants';
import ActionBar from '@/shared/components/ActionBar';
import ActionBarTitle from '@/shared/components/ActionBar/ActionBarTitle';
import ActionButton from '@/shared/components/ActionBar/ActionButton';
import ScreenContainer from '@/shared/components/ScreenContainer';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import { Text } from 'react-native';

export default function PlantsEditScreen() {
  const {id} = useLocalSearchParams<{ id: string }>();
  const plant = usePlant(id);
  const router = useRouter();

  // Hooks must run before the early return below, so fall back to empty values.
  const [plantValues, setPlantValues] = useState(plant ?? emptyPlantFormValues);

  const handleCancel = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace({ pathname: '/plants/single', params: { id } });
    }
  };

  const handleSave = () => {
    if (plantValues.name.trim()) {
      // Handle form submission
      console.log(plantValues);
    }
  };

  if (!plant) {
    return (
      <ScreenContainer>
        <Text>Plant not found.</Text>
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer scroll>
      <ActionBar>
        <ActionButton label="cancel" onPress={handleCancel} />
        <ActionBarTitle title="edit record" />
        <ActionButton label="save" onPress={handleSave} />
      </ActionBar>

      <PlantForm values={plantValues} onChange={setPlantValues} />
    </ScreenContainer>
  );
}
