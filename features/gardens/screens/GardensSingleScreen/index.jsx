import PlantListItem from '@/features/plants/components/PlantListItem';
import ButtonBlock from '@/shared/components/Buttons/ButtonBlock';
import ButtonInline from '@/shared/components/Buttons/ButtonInline';
import { IconSymbol } from '@/shared/components/icon-symbol';
import ScreenContainer from '@/shared/components/ScreenContainer';
import ScreenHeading from '@/shared/components/ScreenHeading';
import { gardensData } from '@/shared/constants/gardens';
import { plantsData } from '@/shared/constants/plants';
import { Link, useLocalSearchParams } from 'expo-router';
import { ScrollView, Text, View } from 'react-native';

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
    <ScrollView style={{flexGrow: 1}}>
      <ScreenContainer>
        <Link href='/gardens' dismissTo asChild>
          <ButtonInline style={{flexDirection: 'row', alignItems: 'center', alignSelf: 'flex-start', marginBottom: 20}}>
            <IconSymbol name='arrow.backward'/>
            <Text style={{marginLeft: 5}}>
               All gardens
            </Text>
          </ButtonInline>
        </Link>
        <ScreenHeading title={garden.name} />
        <View style={{marginBottom: 20}}>
          <Text>Light: {garden.light}</Text>
          <Text>Soil: {garden.soil}</Text>
          <Text>Length: {garden.length}</Text>
          <Text>Width: {garden.width}</Text>
        </View>
        <ScreenHeading title='Plants' level={2} paddingBottom={10} />
        <View style={{gap: 12, marginBottom: 30}}>
          {plants.length === 0 ?
            <Text>This garden doesn&apos;t have any plants yet.</Text>
          :
            plants.map((item) => (
              <PlantListItem
                plantName={item.name}
                plantId={item.id}
                key={item.id}/>
            ))
          }
        </View>
        <Link
          href={{
            pathname: '/gardens/edit',
            params: {id: garden.id }
          }}
          asChild>
          <ButtonBlock>
            <Text>Edit Garden</Text>
          </ButtonBlock>
        </Link>
      </ScreenContainer>
    </ScrollView>
  );
}
