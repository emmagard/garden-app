import PlantListItem from '@/features/plants/components/PlantListItem';
import ButtonLink from '@/shared/components/ButtonLink';
import Input from '@/shared/components/Input';
import { InputSelect } from '@/shared/components/InputSelect';
import ScreenContainer from '@/shared/components/ScreenContainer';
import ScreenHeading from '@/shared/components/ScreenHeading';
import { gardensData } from '@/shared/constants/gardens';
import { lightOptions } from '@/shared/constants/lightOptions';
import { soilOptions } from '@/shared/constants/soilOptions';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { ScrollView, View } from 'react-native';

export default function GardensEditScreen() {
  const {id} = useLocalSearchParams();
  const garden = gardensData.find(garden => garden.id === id);

  if (!garden) return;

  const [gardenName, setGardenName] = useState(garden.name);
  const [gardenLight, setGardenLight] = useState(garden.light);
  const [gardenSoil, setGardenSoil] = useState(garden.soil);
  const [gardenLength, setGardenLength] = useState(garden.length);
  const [gardenWidth, setGardenWidth] = useState(garden.width);

  return (

    <ScrollView style={{flexGrow: 1}}>
      <ScreenContainer>
        <ScreenHeading title={`Editting the ${garden.name}`} />
        <View style={{
          marginBottom: 30,
          flexDirection: 'column',
          gap: 20,
        }}>
            <Input
              label="Garden Name"
              value={gardenName} 
              onChangeText={(newVal) => {setGardenName(newVal)}} />
            <InputSelect
              options={lightOptions}
              label="Light"
              value={gardenLight} 
              onChange={(newVal) => {setGardenLight(newVal)}} />
            <InputSelect
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
        <View>
          <View style={{flexDirection: 'row', gap: 20, alignContent: 'center', alignItems: 'center'}}>
            <ScreenHeading title='Plants' level={2} />
            <ButtonLink href="/plants/new" round size="small">
              <MaterialIcons name="add" size={24} color="black" />
            </ButtonLink>
          </View>
          <View style={{marginBottom: 30}}>
            {garden.plants.map((item) => (
              <PlantListItem
                plantName={item.name}
                plantId={item.id}
                key={item.id}/>
            ))}
          </View>
         
        </View>
      </ScreenContainer>
    </ScrollView>
  );
}
