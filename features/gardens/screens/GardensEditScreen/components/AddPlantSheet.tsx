import type { Plant } from '@/features/plants/types';
import BottomSheet from '@/shared/components/BottomSheet';
import ButtonBlock from '@/shared/components/Buttons/ButtonBlock';
import ScreenHeading from '@/shared/components/ScreenHeading';
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
      <ScreenHeading title="Add plants" level={2} paddingBottom={0}/>

      {plants.length === 0 ?
        <Text>All of your plants are already in this garden.</Text>
      :
        <ScrollView contentContainerStyle={{gap: 12}}>
          {plants.map(plant => {
            const isSelected = selectedIds.includes(plant.id);

            return (
              <Pressable
                key={plant.id}
                onPress={() => toggle(plant.id)}
                accessibilityRole="checkbox"
                accessibilityState={{ checked: isSelected }}
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  backgroundColor: isSelected ? colors.greenLight : colors.white,
                  borderRadius: 8,
                  paddingVertical: 16,
                  paddingHorizontal: 16,
                }}
              >
                <ScreenHeading title={plant.name} level={3} paddingBottom={0}/>
                <Text style={{color: colors.dark, fontSize: 18}}>{isSelected ? '✓' : ''}</Text>
              </Pressable>
            );
          })}
        </ScrollView>
      }

      <Pressable
        onPress={createNewPlant}
        accessibilityRole="button"
        style={({ pressed }) => ({
          alignItems: 'center',
          borderWidth: 1,
          borderStyle: 'dashed',
          borderColor: colors.dark1,
          borderRadius: 8,
          paddingVertical: 16,
          paddingHorizontal: 16,
          opacity: pressed ? 0.7 : 1,
        })}
      >
        <Text style={{color: colors.dark, fontWeight: 'bold'}}>+ Create a new plant</Text>
      </Pressable>

      <ButtonBlock onPress={add} disabled={selectedIds.length === 0}>
        <Text>
          {selectedIds.length > 1 ? `Add ${selectedIds.length} Plants` : 'Add Plant'}
        </Text>
      </ButtonBlock>
    </BottomSheet>
  );
}

export default AddPlantSheet;
