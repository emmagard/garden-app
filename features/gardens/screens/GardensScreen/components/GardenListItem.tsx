import ButtonLink from '@/shared/components/ButtonLink';
import ScreenHeading from '@/shared/components/ScreenHeading';
import { colors } from '@/shared/styles/colors';
import { Text, View } from 'react-native';

function GardenListItem({ gardenName, gardenId }: { gardenName: string; gardenId: string }) {
  return (
    <View style={{
      marginTop: 10,
      backgroundColor: colors.white,
      borderRadius: 5,
      paddingVertical: 16,
      paddingHorizontal: 16,
      display: 'flex',
      justifyContent: 'space-between',
      flexDirection: 'row',
      alignItems: 'center',
      alignContent: 'center'
    }}>
      <ScreenHeading title={gardenName} level={2} paddingBottom={0}/>
      <ButtonLink href={{
        pathname: '/gardens/edit',
        params: {id: gardenId }
      }}>
        <Text style={{ color: colors.dark,}}>Edit</Text>
      </ButtonLink>
    </View>
  );
}

export default GardenListItem;