import ScreenHeading from '@/shared/components/ScreenHeading';
import { colors } from '@/shared/styles/colors';
import { useRouter } from 'expo-router';
import { Pressable } from 'react-native';

function GardenListItem({ gardenName, gardenId }: { gardenName: string; gardenId: string }) {
  const router = useRouter();

  const openGarden = () => {
    router.push({
      pathname: '/gardens/single',
      params: { id: gardenId }
    });
  };

  return (
    <Pressable
      onPress={openGarden}
      accessibilityRole="button"
      accessibilityLabel={`View ${gardenName}`}
      style={({ pressed }) => ({
        marginTop: 10,
        backgroundColor: colors.white,
        borderRadius: 5,
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
      <ScreenHeading title={gardenName} level={2} paddingBottom={0}/>
    </Pressable>
  );
}

export default GardenListItem;