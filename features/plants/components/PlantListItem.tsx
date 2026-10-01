import { colors } from '@/shared/styles/colors';
import { useRouter } from 'expo-router';
import { Pressable, Text, View } from 'react-native';
import PlantHeightIcon from './PlantHeightIcon';

const isWhite = (color: string) => ['#FFFFFF', '#FFF', 'WHITE'].includes(color.toUpperCase());

function PlantListItem({ plant }: { plant: { id: string; name: string; color: string; height: string } }) {
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
        marginTop: 12,
        backgroundColor: colors.white,
        borderRadius: 8,
        paddingVertical: 16,
        paddingHorizontal: 16,
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
        alignContent: 'center',
        opacity: pressed ? 0.7 : 1
      })}
    >
      <Text style={{fontSize: 16}}>{plant.name}</Text>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 16 }}>
        <PlantHeightIcon height={plant.height} />
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
    </Pressable>
  );
}

export default PlantListItem;
