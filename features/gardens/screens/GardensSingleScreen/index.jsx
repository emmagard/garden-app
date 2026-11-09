import GardenPlantList from '@/features/gardens/components/GardenPlantList';
import { useGarden } from '@/features/gardens/hooks/useGardens';
import { usePlantsByIds } from '@/features/plants/hooks/usePlants';
import ButtonInline from '@/shared/components/Buttons/ButtonInline';
import ScreenContainer from '@/shared/components/ScreenContainer';
import ScreenHeading from '@/shared/components/ScreenHeading';
import SmallCapsText from '@/shared/components/SmallCapsText';
import { colors } from '@/shared/styles/colors';
import { fonts } from '@/shared/styles/fonts';
import { Link, useLocalSearchParams } from 'expo-router';
import { FlatList, Text, View, useWindowDimensions } from 'react-native';
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

  // Dynamically fetches current viewport width (handles screen rotations or splits)
  const { width: windowWidth } = useWindowDimensions();

  return (
    <ScreenContainer scroll>
      <View style={{marginBottom: 0, backgroundColor: colors.paper, padding: 0}}>
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
     

        <View style={{
          height: 58,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          borderBottomWidth: 1,
          borderBottomColor: colors.black35,
          paddingTop: 8
        }}>
          <GardenMetaItem label="light" value={garden.light} />
          <GardenMetaItem label="soil" value={garden.soil} />
          <GardenMetaItem label="plot" value={`${garden.width} x ${garden.length}`} />
        </View>

        {garden.notes.length > 0 && (
          <View>
            <SmallCapsText size={14} style={{ marginBottom: 8, marginTop: 8, fontWeight: '600' }}>notes</SmallCapsText>
            <FlatList
              style={{ paddingBottom: 20 }}
              horizontal={true}
              pagingEnabled // Snaps items cleanly like a carousel
              snapToAlignment="start"
              decelerationRate="fast"
              showsHorizontalScrollIndicator={true}
              data={garden.notes}
              keyExtractor={(item) => item.date}
              getItemLayout={(data, index) => ({
                length: windowWidth - 40,
              })}
              renderItem={({ item }) => (
                <View key={item.date} style={{ flex: 1, flexDirection: 'column', width: windowWidth - 40}}>
                  <Text style={{ paddingBottom: 10, fontFamily: fonts.heading, fontSize: 12, color: colors.pencil }}>{ new Date(item.date).toLocaleDateString(undefined, {year: "numeric", month: "long", day: "numeric"}) }</Text>
                  <Text style={{ fontFamily: fonts.body, fontSize: 14, color: colors.pencil, width: windowWidth - 40, lineHeight: 20 }}>{item.text}</Text>
                </View>
              )}
            />
          </View>
        )}
      </View>

      <GardenPlantList plants={plants} />
    </ScreenContainer>
  );
}
