import PlantForm, { emptyPlantFormValues } from '@/features/plants/components/PlantForm';
import ButtonBlock from '@/shared/components/Buttons/ButtonBlock';
import ScreenContainer from '@/shared/components/ScreenContainer';
import ScreenHeading from '@/shared/components/ScreenHeading';
import { useState } from 'react';
import { ScrollView, Text } from 'react-native';

export default function PlantsNewScreen() {
  const [plantValues, setPlantValues] = useState(emptyPlantFormValues);

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
    <ScrollView style={{flexGrow: 1}} contentContainerStyle={{flexGrow: 1}}>
      <ScreenContainer>
        <ScreenHeading title="Add New Plant" paddingBottom={30}/>
        <PlantForm values={plantValues} onChange={setPlantValues} />
        <ButtonBlock onPress={handleAddPlant}>
          <Text>Add Plant</Text>
        </ButtonBlock>
      </ScreenContainer>
    </ScrollView>
  );
}
