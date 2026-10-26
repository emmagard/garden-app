import type { Plant } from '@/features/plants/types';
import BottomSheet from '@/shared/components/BottomSheet';
import ButtonBlock from '@/shared/components/Buttons/ButtonBlock';
import ScreenHeading from '@/shared/components/ScreenHeading';
import SelectableRow from '@/shared/components/SelectableRow';
import SmallCapsText from '@/shared/components/SmallCapsText';
import { colors } from '@/shared/styles/colors';
import { useRouter } from 'expo-router';
import { useRef, useState } from 'react';
import { Pressable, ScrollView, Text } from 'react-native';

type AddPlantSheetProps = {
  visible: boolean;
  plants: Pick<Plant, 'id' | 'name'>[];
  onAdd: (plantIds: string[]) => void;
  onClose: () => void;
};

function AddPlantSheet({ visible, plants, onAdd, onClose }: AddPlantSheetProps) {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const router = useRouter();
  // Runs once the sheet has finished closing, e.g. navigating away.
  const afterCloseRef = useRef<(() => void) | null>(null);

  const handleClosed = () => {
    setSelectedIds([]);
    afterCloseRef.current?.();
    afterCloseRef.current = null;
  };

  const toggle = (plantId: string) => {
    setSelectedIds(ids => ids.includes(plantId)
      ? ids.filter(id => id !== plantId)
      : [...ids, plantId]);
  };

  const add = () => {
    onAdd(selectedIds);
    onClose();
  };

  const createNewPlant = () => {
    // Wait for the modal to close, or it would cover the new screen.
    afterCloseRef.current = () => router.push('/plants/new');
    onClose();
  };

  return (
    <BottomSheet visible={visible} onClose={onClose} onClosed={handleClosed}>
      <ScreenHeading title="Add Plants" level={2} paddingBottom={0}/>

      {plants.length === 0 ?
        <Text>All of your plants are already in this garden.</Text>
      :
        <ScrollView contentContainerStyle={{gap: 12}}>
          {plants.map(plant => (
            <SelectableRow
              key={plant.id}
              label={plant.name}
              selected={selectedIds.includes(plant.id)}
              onPress={() => toggle(plant.id)} />
          ))}
        </ScrollView>
      }

      <Pressable
        onPress={createNewPlant}
        accessibilityRole="button"
        style={({ pressed }) => ({
          alignItems: 'center',
          borderWidth: 1,
          borderStyle: 'dashed',
          borderColor: colors.black35,
          backgroundColor: colors.paperExtraLight,
          borderRadius: 8,
          paddingVertical: 16,
          paddingHorizontal: 16,
          opacity: pressed ? 0.7 : 1,
        })}
      >
        <SmallCapsText size={14}>+ create a new plant</SmallCapsText>
      </Pressable>

      <ButtonBlock onPress={add} disabled={selectedIds.length === 0} style={{backgroundColor: colors.greenDark, borderWidth: 1, borderColor: colors.black35}}>
        <SmallCapsText size={13} color={colors.paperExtraLight}>
          {selectedIds.length > 1 ? `add ${selectedIds.length} plants` : 'add plant'}
        </SmallCapsText>
      </ButtonBlock>
    </BottomSheet>
  );
}

export default AddPlantSheet;
