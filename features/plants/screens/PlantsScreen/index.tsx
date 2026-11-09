import PlantListItem from '@/features/plants/components/PlantListItem';
import { usePlants } from '@/features/plants/hooks/usePlants';
import ButtonInline from '@/shared/components/Buttons/ButtonInline';
import ButtonLink from '@/shared/components/Buttons/ButtonLink';
import RuledList from '@/shared/components/RuledList';
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
          <RuledList>
            <FlatList
              data={plants}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <PlantListItem
                  plant={item}
                  key={item.id}/>
              )}
            />
          </RuledList>
        }
      </View>
    </ScreenContainer>
  );
}
