import ActionBar from '@/shared/components/ActionBar';
import ActionBarTitle from '@/shared/components/ActionBar/ActionBarTitle';
import ActionButton from '@/shared/components/ActionBar/ActionButton';
import ScreenContainer from '@/shared/components/ScreenContainer';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import GardenForm, { emptyGardenFormValues } from '../../components/GardenForm';


export default function GardensNewScreen() {
  const [gardenValues, setGardenValues] = useState(emptyGardenFormValues);
  const router = useRouter();
  
  const handleCancel = () => {
    // This screen can be opened from the plants list or the garden edit screen,
    // so go back to wherever it came from.
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace('/gardens');
    }
  };

  const handleSave = () => {
    if (gardenValues.name.trim()) {
      // Handle form submission
      console.log(gardenValues);
      setGardenValues(emptyGardenFormValues);

      // Then if plant is added successfully, navigate to the new plant's single screen
      // navigate('/gardens/[id]', { id: newGardenId });
    }
  };

  return (
    <ScreenContainer>
      <ActionBar>
        <ActionButton label="cancel" onPress={handleCancel} />
        <ActionBarTitle title="new garden record" />
        <ActionButton label="save" onPress={handleSave} />
      </ActionBar>
      <GardenForm
        values={gardenValues}
        onChange={setGardenValues}
      />
    </ScreenContainer>
  );
}
