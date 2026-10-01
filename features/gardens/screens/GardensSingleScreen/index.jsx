import PlantListItem from '@/features/plants/components/PlantListItem';
import ButtonInline from '@/shared/components/Buttons/ButtonInline';
import ScreenContainer from '@/shared/components/ScreenContainer';
import ScreenHeading from '@/shared/components/ScreenHeading';
import { gardensData } from '@/shared/constants/gardens';
import { plantsData } from '@/shared/constants/plants';
import { colors } from '@/shared/styles/colors';
import { Link, useLocalSearchParams } from 'expo-router';
import { ScrollView, Text, View } from 'react-native';
import GardenMetaItem from './components/GardenMetaItem';

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
        <View style={{marginBottom: 20, backgroundColor: colors.paper, padding: 0}}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 24}}>
            <ButtonInline>
              <Link  href='/gardens' dismissTo asChild>
                <Text style={{fontSize: 11, color: colors.ink, fontVariant: ['small-caps']}}>back</Text>
              </Link>
            </ButtonInline>
          
          <ButtonInline>
            <Link
              href={{
                pathname: '/gardens/edit',
                params: {id: garden.id }
              }}
              asChild>
              <Text style={{fontSize: 11, color: colors.ink, fontVariant: ['small-caps']}}>edit</Text>
            </Link>
            </ButtonInline>
          </View>
          <View style={{borderBottomWidth: 1, borderBottomColor: colors.black35}}>
            <ScreenHeading title={garden.name} paddingBottom={6}/>
          </View>
          
          
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: colors.black35}}>
            <GardenMetaItem label="light" value={garden.light} />
            <GardenMetaItem label="soil" value={garden.soil} />
            <GardenMetaItem label="plot" value={`${garden.width} x ${garden.length}`} />
          </View>
        </View>

        <View style={{
          backgroundColor: colors.paper,
          paddingVertical: 2,
          marginTop: 24,
          borderTopWidth: 1,
          borderColor: colors.black35
          }}>
          <ScreenHeading title='Plants' level={2} paddingBottom={20} />

          {/* Plant List */}
          <View style={{
            marginBottom: 30,
            borderTopWidth: 1,
            borderColor: colors.black35
          }}>
            {plants.length === 0 ?
              <Text>This garden doesn&apos;t have any plants yet.</Text>
            :
              plants.map((item) => (
                <PlantListItem
                  plant={item}
                  key={item.id}/>
              ))
            }

            {/* Vertical margin rule, measured against the list only so it starts below
                the heading. Comes after the rows so it draws on top of their paper
                background; pointerEvents 'none' lets taps reach the rows. */}
            <View style={{
              position: 'absolute',
              top: -4,
              bottom: -4,
              left: 32,
              width: 1,
              backgroundColor: colors.fadedRed,
              pointerEvents: 'none',
            }} />
          </View>
        </View>
      </ScreenContainer>
    </ScrollView>
  );
}

