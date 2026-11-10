import ScreenHeading from '@/shared/components/ScreenHeading';
import { ruleRowHeight } from '@/shared/constants/theme';
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
        height: ruleRowHeight,
        backgroundColor: colors.paper,
        borderBottomWidth: 1,
        borderColor: colors.black35,
        paddingLeft: 36,
        paddingTop: 2,
        paddingBottom: 10,
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'flex-end',
        opacity: pressed ? 0.7 : 1
      })}
    >
      <ScreenHeading title={gardenName} level={2} paddingBottom={0}/>
    </Pressable>
  );
}

export default GardenListItem;