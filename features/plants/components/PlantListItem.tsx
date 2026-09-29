import ScreenHeading from '@/shared/components/ScreenHeading';
import { colors } from '@/shared/styles/colors';
import { useRouter } from 'expo-router';
import { Pressable } from 'react-native';

function PlantListItem({ plantName, plantId }: { plantName: string; plantId: string }) {
  const router = useRouter();

  const openPlant = () => {
    router.push({
      pathname: '/plants/single',
      params: { id: plantId }
    });
  };

  return (
    <Pressable
      onPress={openPlant}
      accessibilityRole="button"
      accessibilityLabel={`View ${plantName}`}
      style={({ pressed }) => ({
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
      <ScreenHeading title={plantName} level={3} paddingBottom={0}/>
    </Pressable>
  );
}

export default PlantListItem;
