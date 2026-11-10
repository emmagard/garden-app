import PlantMetaItem from '@/features/plants/components/PlantMetaItem';
import { usePlant } from '@/features/plants/hooks/usePlants';
import ActionBar from '@/shared/components/ActionBar';
import ActionButton from '@/shared/components/ActionBar/ActionButton';
import ColorDot from '@/shared/components/ColorDot';
import ScreenContainer from '@/shared/components/ScreenContainer';
import ScreenHeading from '@/shared/components/ScreenHeading';
import { colors } from '@/shared/styles/colors';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Text, View } from 'react-native';

export default function PlantsSingleScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const plant = usePlant(id);
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  const handleEdit = () => {
    if (!plant?.id) return;
    router.push({
      pathname: '/plants/edit',
      params: { id: plant.id },
    });
  };

  if (!plant) {
    return (
      <ScreenContainer>
        <Text>Plant not found.</Text>
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer scroll>
      <ActionBar>
        <ActionButton label="back" onPress={handleBack}  />
        <ActionButton label="edit" onPress={handleEdit} />
      </ActionBar>
      <View style={{borderBottomWidth: 1, borderBottomColor: colors.black35, flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 20}}>
        <ScreenHeading title={plant.name} paddingBottom={6} />
        <ColorDot color={plant.color} />
      </View>

      {/* Add a description? */}
      {/*Add an image for plant tag and or image of the plant itself? */}
      <View style={{marginBottom: 20}}>
        {plant.scientificName ? <PlantMetaItem label="scientific name" value={plant.scientificName} /> : null}
        <PlantMetaItem label="height" value={plant.height} />
        <PlantMetaItem label="width" value={plant.width} />
      </View>
    </ScreenContainer>
  );
}
