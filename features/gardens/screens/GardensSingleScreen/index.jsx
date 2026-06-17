import ButtonLink from '@/shared/components/Buttons/ButtonLink';
import ScreenContainer from '@/shared/components/ScreenContainer';
import ScreenHeading from '@/shared/components/ScreenHeading';
import { gardenData } from '@/shared/constants/gardens';
import { Text, View } from 'react-native';

export default function GardensSingleScreen({garden = gardenData}) {
  return (
    <ScreenContainer>
      <ScreenHeading title={garden.name} />
      <View style={{marginBottom: 20}}>
        <Text>Light: {garden.light}</Text>
        <Text>Soil: {garden.soil}</Text>
        <Text>Length: {garden.length}</Text>
        <Text>Width: {garden.width}</Text>
      </View>
      <ScreenHeading title='Plants' level={2} />
     
      <ButtonLink href='/gardens/edit'><Text>Edit Garden</Text></ButtonLink>
    </ScreenContainer>
  );
}
