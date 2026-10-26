import { useGardens } from '@/features/gardens/hooks/useGardens';
import ButtonInline from '@/shared/components/Buttons/ButtonInline';
import ButtonLink from '@/shared/components/Buttons/ButtonLink';
import ScreenContainer from '@/shared/components/ScreenContainer';
import ScreenHeading from '@/shared/components/ScreenHeading';
import SmallCapsText from '@/shared/components/SmallCapsText';
import { Link } from 'expo-router';
import { FlatList, Text, View } from 'react-native';
import GardenListItem from './components/GardenListItem';

export default function GardensScreen() {
  const gardens = useGardens();

  if (!gardens) { return false; }

  return (
    <ScreenContainer>
      <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24}}>
                
        <ScreenHeading title="Your Gardens"  paddingBottom={0}/>
        <ButtonInline>
          <Link
            href={{
              pathname: '/gardens/new',
            }}
            asChild>
            <SmallCapsText>add garden</SmallCapsText>
          </Link>
        </ButtonInline>
      </View>

      { gardens.length === 0 ?
        <>
          <Text>You don&apos;t have any gardens.</Text>
          <ButtonLink href="/gardens/new">
            <Text>Add a new garden to get started.</Text>
          </ButtonLink>
        </>
      :
        <FlatList
          data={gardens}
          renderItem={ ({item}) => <GardenListItem gardenName={item.name} gardenId={item.id} />}
          keyExtractor={item => item.id}
        />       
      }
    </ScreenContainer>
  );
}
