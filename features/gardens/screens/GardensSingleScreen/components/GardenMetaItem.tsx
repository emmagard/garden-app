import SmallCapsText from '@/shared/components/SmallCapsText';
import { colors } from '@/shared/styles/colors';
import { Text, View } from 'react-native';

function GardenMetaItem({ label, value }: { label: string; value: string }) {
  // Label and value are separate Texts in a row: margins and padding are
  // ignored on a Text nested inside another Text.
  return (
    <View style={{ flexDirection: 'row', alignItems: 'baseline' }}>
      <SmallCapsText size={12} style={{ marginRight: 5 }}>{label}</SmallCapsText>
      <Text style={{ fontSize: 12, color: colors.ink }}>{value}</Text>
    </View>
  );
}

export default GardenMetaItem;
