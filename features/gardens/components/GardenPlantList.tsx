import PlantListItem from '@/features/plants/components/PlantListItem';
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
      marginTop: 24,
      borderTopWidth: 1,
      borderColor: colors.black35
    }}>
      <ScreenHeading title='Plants' level={2} paddingBottom={20} />

      <View style={{
        marginBottom: 30,
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

        {/* Vertical margin rule, measured against the list only so it starts below
            the heading. Comes after the rows so it draws on top of their paper
            background; pointerEvents 'none' lets taps reach the rows. */}
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
  );
}

export default GardenPlantList;
