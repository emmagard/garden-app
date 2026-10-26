import PlantListItem from '@/features/plants/components/PlantListItem';
import { usePlants } from '@/features/plants/hooks/usePlants';
import ButtonInline from '@/shared/components/Buttons/ButtonInline';
import ButtonLink from '@/shared/components/Buttons/ButtonLink';
import ScreenContainer from '@/shared/components/ScreenContainer';
import ScreenHeading from '@/shared/components/ScreenHeading';
import SmallCapsText from '@/shared/components/SmallCapsText';
import { colors } from '@/shared/styles/colors';
import { Link } from 'expo-router';
import { FlatList, Text, View } from 'react-native';

export default function PlantsScreen() {
  const plants = usePlants();

  return (
    <ScreenContainer>
      <View style={{marginBottom: 20, backgroundColor: colors.paper, padding: 0}}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
          marginBottom: 24}}>
          
          <ScreenHeading title="All Plants"  paddingBottom={0}/>
          <ButtonInline>
            <Link
              href={{
                pathname: '/plants/new',
              }}
              asChild>
              <SmallCapsText>add plant</SmallCapsText>
            </Link>
          </ButtonInline>
        </View>
       
        { plants.length === 0 ?
          <>
            <Text>You don&apos;t have any plants.</Text>
            <ButtonLink href="/plants/new">
              <Text>Add a new plant to get started.</Text>
            </ButtonLink>
          </>
        :
          <View style={{
            marginBottom: 30,
            borderTopWidth: 1,
            borderColor: colors.black35
          }}>
            <FlatList
              data={plants}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <PlantListItem
                  plant={item}
                  key={item.id}/>
              )}
            />
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
        }
      </View>
    </ScreenContainer>
  );
}
