import GardenPlantList from '@/features/gardens/components/GardenPlantList';
import { useGarden } from '@/features/gardens/hooks/useGardens';
import { usePlantsByIds } from '@/features/plants/hooks/usePlants';
import ButtonInline from '@/shared/components/Buttons/ButtonInline';
import ScreenContainer from '@/shared/components/ScreenContainer';
import ScreenHeading from '@/shared/components/ScreenHeading';
import SmallCapsText from '@/shared/components/SmallCapsText';
import { colors } from '@/shared/styles/colors';
import { Link, useLocalSearchParams } from 'expo-router';
import { Text, View } from 'react-native';
import GardenMetaItem from './components/GardenMetaItem';

export default function GardensSingleScreen() {
  const {id} = useLocalSearchParams();
  const garden = useGarden(id);
  // Hooks must run before the early return below.
  const plants = usePlantsByIds(garden?.plantIds ?? []);

  if (!garden) {
    return (
      <ScreenContainer>
        <Text>Garden not found.</Text>
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer scroll>
      <View style={{marginBottom: 20, backgroundColor: colors.paper, padding: 0}}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 24}}>
          <ButtonInline>
            <Link  href='/gardens' dismissTo asChild>
              <SmallCapsText>back</SmallCapsText>
            </Link>
          </ButtonInline>

          <ButtonInline>
            <Link
              href={{
                pathname: '/gardens/edit',
                params: {id: garden.id }
              }}
              asChild>
              <SmallCapsText>edit</SmallCapsText>
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

      <GardenPlantList plants={plants} />
    </ScreenContainer>
  );
}
