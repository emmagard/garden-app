import { colors } from '@/shared/styles/colors';
import { Text, View } from 'react-native';

function GardenMetaItem({ label, value }: { label: string; value: string }) {
  // Label and value are separate Texts in a row: margins and padding are
  // ignored on a Text nested inside another Text.
  return (
    <View style={{ flexDirection: 'row', alignItems: 'baseline' }}>
      <Text style={{ fontSize: 12, color: colors.ink, fontVariant: ['small-caps'], marginRight: 5 }}>{label}</Text>
      <Text style={{ fontSize: 12, color: colors.ink }}>{value}</Text>
    </View>
  );
}

export default GardenMetaItem;
