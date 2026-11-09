import PlantListItem from '@/features/plants/components/PlantListItem';
import RuledList from '@/shared/components/RuledList';
import ScreenHeading from '@/shared/components/ScreenHeading';
import { colors } from '@/shared/styles/colors';
import { ComponentProps } from 'react';
import { Text, View } from 'react-native';

type GardenPlantListProps = {
  plants: ComponentProps<typeof PlantListItem>['plant'][];
};

// The "Plants" section on the garden screens: heading, ruled list and margin rule.
function GardenPlantList({ plants }: GardenPlantListProps) {
  return (
    <View style={{
      backgroundColor: colors.paper,
      paddingVertical: 2,
      marginTop: 0,
      borderTopWidth: 1,
      borderColor: colors.black35
    }}>
      <ScreenHeading title='Plants' level={2} paddingBottom={24} />

      <RuledList>
        {plants.length === 0 ?
          <Text>This garden doesn&apos;t have any plants yet.</Text>
        :
          plants.map((item) => (
            <PlantListItem
              plant={item}
              key={item.id}/>
          ))
        }
      </RuledList>
    </View>
  );
}

export default GardenPlantList;
