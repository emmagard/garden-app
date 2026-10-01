import PlantListItem from '@/features/plants/components/PlantListItem';
import { IconSymbol } from '@/shared/components/icon-symbol';
import ScreenContainer from '@/shared/components/ScreenContainer';
import ScreenHeading from '@/shared/components/ScreenHeading';
import { colors } from '@/shared/styles/colors';

import { gardensData } from '@/shared/constants/gardens';
import { plantsData } from '@/shared/constants/plants';
import { Link, useLocalSearchParams } from 'expo-router';
import { Pressable, ScrollView, Text, View } from 'react-native';

export default function GardensSingleScreen() {
  const {id} = useLocalSearchParams();
  const garden = gardensData.find(garden => garden.id === id);

  if (!garden) {
    return (
      <ScreenContainer>
        <Text>Garden not found.</Text>
      </ScreenContainer>
    );
  }

  const plants = plantsData.filter(plant => garden.plantIds.includes(plant.id));

  return (
    <ScrollView style={{flexGrow: 1}} contentContainerStyle={{flexGrow: 1}}>
      <ScreenContainer>
        <Link href='/gardens' dismissTo asChild>
        <Pressable style={{marginBottom: 20}}>
          <IconSymbol name='arrow.backward'/>
        </Pressable>
        </Link>
        <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline'}}>
          <ScreenHeading title={garden.name} />
          <Link
            href={{
              pathname: '/gardens/edit',
              params: {id: garden.id }
            }}
            asChild>
            <Pressable>
              <IconSymbol name='pencil' size={24} color={colors.dark} />
            </Pressable>
          </Link>
        </View>
        
        <View style={{marginBottom: 30}}>
          <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 4}}>
            <Text style={{fontWeight: 'bold', marginRight: 10, color: colors.dark}}>{garden.light}</Text>
            <Text style={{fontWeight: 'bold', color: colors.dark}}>{garden.soil}</Text>
          </View>
          <Text style={{fontWeight: 'bold', color: colors.dark}}>Dimensions: {garden.width} x {garden.length}</Text>
        </View>
        <ScreenHeading title='Plants' level={2} paddingBottom={12} />
        <View style={{marginBottom: 30}}>
          {plants.length === 0 ?
            <Text>This garden doesn&apos;t have any plants yet.</Text>
          :
            plants.map((item) => (
              <PlantListItem
                plant={item}
                key={item.id}/>
            ))
          }
        </View>
       
      </ScreenContainer>
    </ScrollView>
  );
}
