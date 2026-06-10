import PlantListItem from '@/features/plants/components/PlantListItem';
import Input from '@/shared/components/Input';
import ScreenContainer from '@/shared/components/ScreenContainer';
import ScreenHeading from '@/shared/components/ScreenHeading';
import { gardensData } from '@/shared/constants/gardens';
import { useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { FlatList, View } from 'react-native';

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
    <ScreenContainer>
      <ScreenHeading title={ `Editting the ${gardenName}`} />
      <View style={{marginBottom: 20, flexDirection: 'row', alignContent: 'stretch', gap: 20, marginRight: 20 }}>
        <View style={{width: '50%'}}>
          <Input
            label="Light:"
            labelPlacement={'beside'}
            value={gardenLight} 
            onChangeText={(newVal) => {setGardenLight(newVal)}} />
          <Input
            label="Soil:"
            labelPlacement={'beside'}
            value={gardenSoil}
            onChangeText={(newVal) => {setGardenSoil(newVal)}} />

        </View>
        <View style={{width: '50%'}}>
          <Input
            label="Length:"
            labelPlacement={'beside'}
            value={gardenLength}
            onChangeText={(newVal) => {setGardenLength(newVal)}} />
          <Input
            label="Width:"
            labelPlacement={'beside'}
            value={gardenWidth}
            onChangeText={(newVal) => {setGardenWidth(newVal)}} />
        </View>
      </View>
      <ScreenHeading title='Plants' level={2} />
      <FlatList
        data={garden.plants}
        renderItem={ ({item}) => <PlantListItem plantName={item.name} plantId={item.id} />}
        keyExtractor={item => item.id}
      />   
    </ScreenContainer>
  );
}
