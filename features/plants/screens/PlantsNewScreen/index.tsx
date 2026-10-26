import PlantForm, { emptyPlantFormValues } from '@/features/plants/components/PlantForm';
import FormTopBar from '@/shared/components/FormTopBar';
import ScreenContainer from '@/shared/components/ScreenContainer';
import { useRouter } from 'expo-router';
import { useState } from 'react';

export default function PlantsNewScreen() {
  const [plantValues, setPlantValues] = useState(emptyPlantFormValues);
  const router = useRouter();

  const handleCancel = () => {
    // This screen can be opened from the plants list or the garden edit screen,
    // so go back to wherever it came from.
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace('/plants');
    }
  };

  const handleAddPlant = () => {
    if (plantValues.name.trim()) {
      // Handle form submission
      console.log(plantValues);
      setPlantValues(emptyPlantFormValues);

      // Then if plant is added successfully, navigate to the new plant's single screen
      // navigate('/plants/[id]', { id: newPlantId });
    }
  };

  return (
    <ScreenContainer scroll>
      <FormTopBar
        title="new plant record"
        onCancel={handleCancel}
        onSave={handleAddPlant}
        saveDisabled={!plantValues.name.trim()} />

      <PlantForm values={plantValues} onChange={setPlantValues} />
    </ScreenContainer>
  );
}
