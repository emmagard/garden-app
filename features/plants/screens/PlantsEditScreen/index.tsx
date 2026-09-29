import PlantForm, { emptyPlantFormValues } from '@/features/plants/components/PlantForm';
import ButtonBlock from '@/shared/components/Buttons/ButtonBlock';
import ScreenContainer from '@/shared/components/ScreenContainer';
import ScreenHeading from '@/shared/components/ScreenHeading';
import { plantsData } from '@/shared/constants/plants';
import { useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { ScrollView, Text } from 'react-native';

export default function PlantsEditScreen() {
  const {id} = useLocalSearchParams();
  const plant = plantsData.find(plant => plant.id === id);

  // Hooks must run before the early return below, so fall back to empty values.
  const [plantValues, setPlantValues] = useState(plant ?? emptyPlantFormValues);

  const handleSavePlant = () => {
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
    <ScrollView style={{flexGrow: 1}}>
      <ScreenContainer>
        <ScreenHeading title={`Editing ${plant.name}`} paddingBottom={30}/>
        <PlantForm values={plantValues} onChange={setPlantValues} />
         <ButtonBlock onPress={handleSavePlant}>
            <Text>Save Plant</Text>
          </ButtonBlock>
      </ScreenContainer>
    </ScrollView>
  );
}
