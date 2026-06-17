import ButtonLink from '@/shared/components/Buttons/ButtonLink';
import ScreenHeading from '@/shared/components/ScreenHeading';
import { colors } from '@/shared/styles/colors';
import { Text, View } from 'react-native';

function PlantListItem({ plantName, plantId }: { plantName: string; plantId: string }) {
  return (
    <View style={{
      backgroundColor: colors.white,
      borderRadius: 8,
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