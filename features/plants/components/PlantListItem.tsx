import { colors } from '@/shared/styles/colors';
import { fonts } from '@/shared/styles/fonts';
import { useRouter } from 'expo-router';
import { Pressable, Text, View } from 'react-native';

const isWhite = (color: string) => ['#FFFFFF', '#FFF', 'WHITE'].includes(color.toUpperCase());

function PlantListItem({ plant }: { plant: { id: string; name: string; color: string; height: string, scientificName: string } }) {
  const router = useRouter();

  const openPlant = () => {
    router.push({
      pathname: '/plants/single',
      params: { id: plant.id }
    });
  };

  return (
    <Pressable
      onPress={openPlant}
      accessibilityRole="button"
      accessibilityLabel={`View ${plant.name}`}
      style={({ pressed }) => ({
        backgroundColor: colors.paper,
        borderBottomWidth: 1,
        borderColor: colors.black35,
        paddingTop: 2,
        paddingBottom: 20,
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'flex-start',
        opacity: pressed ? 0.7 : 1
      })}
    >
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', flex: 1, gap: 0, paddingLeft: 36 }}>
        <View>
          <Text style={{fontSize: 13.5}}>{plant.name}</Text>
          <Text style={{fontFamily: fonts.heading, fontSize: 12, color: colors.pencil}}>{plant.scientificName}</Text>
        </View>
        
        <View style={{flexDirection: 'row', alignItems: 'center', gap: 6}}> 
          <Text style={{fontSize: 11, fontVariant: ['small-caps'], color: colors.pencil}}>{plant.height}</Text>
          <View style={{
            width: 22,
            height: 22,
            borderRadius: 50,
            backgroundColor: plant.color,
            // Outline white so it stays visible against the white row. The border is
            // always there (transparent otherwise) so every dot is the same size.
            borderWidth: 1,
            borderColor: isWhite(plant.color) ? colors.dark1 : 'transparent',
          }} />
        </View>
      </View>
    </Pressable>
  );
}

export default PlantListItem;
