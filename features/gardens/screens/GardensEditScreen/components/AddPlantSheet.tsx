import type { Plant } from '@/features/plants/types';
import ButtonBlock from '@/shared/components/Buttons/ButtonBlock';
import ScreenHeading from '@/shared/components/ScreenHeading';
import { colors } from '@/shared/styles/colors';
import { useRouter } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { Animated, Modal, Pressable, ScrollView, StyleSheet, Text, useWindowDimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type AddPlantSheetProps = {
  visible: boolean;
  plants: Pick<Plant, 'id' | 'name'>[];
  onAdd: (plantIds: string[]) => void;
  onClose: () => void;
};

function AddPlantSheet({ visible, plants, onAdd, onClose }: AddPlantSheetProps) {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  // Keep the modal mounted after `visible` turns false so the exit animation can play.
  const [isMounted, setIsMounted] = useState(visible);
  const sheetAnim = useRef(new Animated.Value(0)).current;
  const backdropAnim = useRef(new Animated.Value(0)).current;
  const { height: windowHeight } = useWindowDimensions();
  const router = useRouter();
  // Runs once the sheet has finished closing, e.g. navigating away.
  const afterCloseRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    if (visible) {
      setIsMounted(true);
      // Slide the sheet up, then fade the background into the overlay.
      Animated.parallel([
        Animated.timing(sheetAnim, { toValue: 1, duration: 250, useNativeDriver: true }),
        Animated.timing(backdropAnim, { toValue: 1, duration: 200, useNativeDriver: true }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(backdropAnim, { toValue: 0, duration: 150, useNativeDriver: true }),
        Animated.timing(sheetAnim, { toValue: 0, duration: 200, useNativeDriver: true }),
      ]).start(() => {
        setIsMounted(false);
        setSelectedIds([]);
        afterCloseRef.current?.();
        afterCloseRef.current = null;
      });
    }
  }, [visible, sheetAnim, backdropAnim]);

  const sheetTranslateY = sheetAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [windowHeight, 0],
  });

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
    <Modal
      visible={isMounted}
      transparent={true}
      animationType="none"
      onRequestClose={onClose}
    >
      <Animated.View style={[StyleSheet.absoluteFill, {backgroundColor: colors.black35, opacity: backdropAnim}]}>
        <Pressable
          onPress={onClose}
          accessibilityLabel="Close"
          style={StyleSheet.absoluteFill} />
      </Animated.View>
      <Animated.View
        pointerEvents="box-none"
        style={{flex: 1, justifyContent: 'flex-end', transform: [{ translateY: sheetTranslateY }]}}
      >
        <Animated.View style={{
          backgroundColor: colors.light,
          borderTopLeftRadius: 16,
          borderTopRightRadius: 16,
          maxHeight: '70%',
        }}>
          <SafeAreaView edges={['bottom']} style={{padding: 20, gap: 16}}>
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
          </SafeAreaView>
        </Animated.View>
      </Animated.View>
    </Modal>
  );
}

export default AddPlantSheet;
