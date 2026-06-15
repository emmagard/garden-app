import ButtonLink from '@/shared/components/ButtonLink';
import ScreenHeading from '@/shared/components/ScreenHeading';
import { colors } from '@/shared/styles/colors';
import { Text, View } from 'react-native';

function PlantListItem({ plantName, plantId }: { plantName: string; plantId: string }) {
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
      <ScreenHeading title={plantName} level={3} paddingBottom={0}/>
      <ButtonLink
        size='small'
        href={{
          pathname: '/plants/edit',
          params: {id: plantId }
        }
      }>
        <Text style={{fontSize: 10}}>Edit</Text>
      </ButtonLink>
    </View>
  );
}

export default PlantListItem;