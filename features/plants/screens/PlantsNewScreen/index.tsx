import PlantForm, { emptyPlantFormValues } from '@/features/plants/components/PlantForm';
import ActionBar from '@/shared/components/ActionBar';
import ActionBarTitle from '@/shared/components/ActionBar/ActionBarTitle';
import ActionButton from '@/shared/components/ActionBar/ActionButton';
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

  const handleSave = () => {
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
      <ActionBar>
        <ActionButton label="cancel" onPress={handleCancel} />
        <ActionBarTitle title="new plant record" />
        <ActionButton label="save" onPress={handleSave} />
      </ActionBar>
    
      <PlantForm values={plantValues} onChange={setPlantValues} />
    </ScreenContainer>
  );
}
