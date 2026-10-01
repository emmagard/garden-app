import PlantListItem from '@/features/plants/components/PlantListItem';
import ButtonBlock from '@/shared/components/Buttons/ButtonBlock';
import ButtonInline from '@/shared/components/Buttons/ButtonInline';
import Input from '@/shared/components/Input';
import InputLabel from '@/shared/components/InputLabel';
import InputSheetSelect from '@/shared/components/InputSheetSelect';
import ScreenContainer from '@/shared/components/ScreenContainer';
import ScreenHeading from '@/shared/components/ScreenHeading';
import { gardensData } from '@/shared/constants/gardens';
import { lightOptions } from '@/shared/constants/lightOptions';
import { plantsData } from '@/shared/constants/plants';
import { soilOptions } from '@/shared/constants/soilOptions';
import { colors } from '@/shared/styles/colors';
import { fonts } from '@/shared/styles/fonts';
import { Link, useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import { ScrollView, Text, TextInput, View } from 'react-native';
import AddPlantSheet from './components/AddPlantSheet';

export default function GardensEditScreen() {
  const {id} = useLocalSearchParams();
  const garden = gardensData.find(garden => garden.id === id);

  // Hooks must run before the early return below, so fall back to empty values.
  const [gardenName, setGardenName] = useState(garden?.name ?? '');
  const [gardenLight, setGardenLight] = useState(garden?.light ?? '');
  const [gardenSoil, setGardenSoil] = useState(garden?.soil ?? '');
  const [gardenLength, setGardenLength] = useState(garden?.length ?? '');
  const [gardenWidth, setGardenWidth] = useState(garden?.width ?? '');
  const [gardenPlantIds, setGardenPlantIds] = useState(garden?.plantIds ?? []);
  const [isAddPlantOpen, setIsAddPlantOpen] = useState(false);
  const router = useRouter();

  const handleSaveChanges = () => {
    if (garden) {
      // Handle saving changes to the garden
      console.log({
        id: garden.id,
        name: gardenName,
        light: gardenLight,
        soil: gardenSoil,
        length: gardenLength,
        width: gardenWidth,
        plantIds: gardenPlantIds,
      });

      // You would typically update the garden in your data store here
      // Then navigate back to the garden's detail page or show a success message.
      // dismissTo goes back to the single screen if it's underneath (opened from
      // there), otherwise replaces this screen with it (opened from the list).
      router.dismissTo({
        pathname: '/gardens/single',
        params: { id: garden.id }
      });
    }
  };    

  if (!garden) {
    return (
      <ScreenContainer>
        <Text>Garden not found.</Text>
      </ScreenContainer>
    );
  }

  const plants = plantsData.filter(plant => gardenPlantIds.includes(plant.id));
  const availablePlants = plantsData.filter(plant => !gardenPlantIds.includes(plant.id));

  return (
    <ScrollView style={{flexGrow: 1}} contentContainerStyle={{flexGrow: 1}}>
      <ScreenContainer>
        {/* Top Bar */}
        <View style={{backgroundColor: colors.paper, padding: 0, borderRadius: 10, marginBottom: 24}}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline'}}>
            <ButtonInline>
              <Link href={{
                pathname: '/gardens/single',
                params: {id: garden.id }
              }} dismissTo asChild>
                <Text style={{fontSize: 11, color: colors.ink, fontVariant: ['small-caps']}}>cancel</Text>
              </Link>
            </ButtonInline>
            <Text style={{fontSize: 12, fontVariant: ['small-caps'], color: colors.pencil, marginBottom: 4}}>edit record</Text>
            <ButtonInline onPress={handleSaveChanges}>
              <Text style={{fontSize: 11, color: colors.ink, fontVariant: ['small-caps']}}>save</Text>
            </ButtonInline>
          </View>
        </View>
              
        {/* Garden Details */}
        <View style={{
          paddingBottom: 12,
          marginBottom: 24,
          borderBottomWidth: 1,
          borderBottomColor: colors.black35,
          flexDirection: 'column',
          gap: 8,
        }}>
          <View style={{ flexDirection: 'column', alignItems: 'stretch'}}>
            <InputLabel>garden name</InputLabel>
            <TextInput
              value={gardenName} 
              onChangeText={(newVal) => {setGardenName(newVal)}}
              style={{
                fontFamily: fonts.heading,
                fontSize: 20,
                borderWidth: 1,
                borderColor: colors.black35,
                backgroundColor: colors.paperLight,
                paddingVertical: 8,
                paddingHorizontal: 10,
                borderRadius: 8}}/>
          </View>
          <View style={{flexDirection: 'row', gap: 10}}>
            <InputSheetSelect
              options={lightOptions}
              label="light"
              value={gardenLight} 
              onChange={(newVal) => {setGardenLight(newVal)}} />
            <InputSheetSelect
              options={soilOptions}
              label="soil"
              value={gardenSoil}
              onChange={(newVal) => {setGardenSoil(newVal)}} />
            <Input
              label="plot dimensions"
              labelPlacement={'above'}
              value={gardenLength}
              onChangeText={(newVal) => {setGardenLength(newVal)}} />
          </View>
        </View>
        
        {/* Plants */}
        <View style={{
          backgroundColor: colors.paper,
          paddingVertical: 2,
          marginTop: 24,
          borderTopWidth: 1,
          borderColor: colors.black35
          }}>
          {/* Wraps the heading and list so the margin rule runs through both. */}
          <View style={{ marginBottom: 30 }}>
            <ScreenHeading title='Plants' level={2} paddingBottom={20} />

            {/* Plant List */}
            <View style={{
              borderTopWidth: 1,
              borderColor: colors.black35
            }}>
              {plants.length === 0 ?
                <Text>This garden doesn&apos;t have any plants yet.</Text>
              :
                plants.map((item) => (
                  <PlantListItem
                    plant={item}
                    key={item.id}/>
                ))
              }
               {/* Vertical margin rule. Comes after the heading and rows so it draws on top
                of their paper background; pointerEvents 'none' lets taps reach the rows. */}
              <View style={{
                position: 'absolute',
                top: -4,
                bottom: -4,
                left: 32,
                width: 1,
                backgroundColor: colors.fadedRed,
                pointerEvents: 'none',
              }} />
            </View>
          </View>
        </View>
        
        <ButtonBlock
          onPress={() => setIsAddPlantOpen(true)}
          style={{
            borderWidth: 1,
            borderColor: colors.black35,
            marginTop: 20,
            marginBottom: 40 }}>
          <Text style={{fontSize: 13, color: colors.ink, fontVariant: ['small-caps']}}>+ add a plant</Text>
        </ButtonBlock>
       
        <AddPlantSheet
          visible={isAddPlantOpen}
          plants={availablePlants}
          onAdd={(plantIds) => setGardenPlantIds(ids => [...ids, ...plantIds])}
          onClose={() => setIsAddPlantOpen(false)} />
      </ScreenContainer>
    </ScrollView>
  );
}
