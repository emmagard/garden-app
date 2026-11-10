import SmallCapsText from '@/shared/components/SmallCapsText';
import { colors } from '@/shared/styles/colors';
import { Text, View } from 'react-native';

function PlantMetaItem({ label, value }: { label: string; value: string }) {
  // Label and value are separate Texts in a row: margins and padding are
  // ignored on a Text nested inside another Text.
  return (
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 6 }}>
      <SmallCapsText size={16} style={{ marginRight: 5, fontWeight: '600' }}>{label}</SmallCapsText>
      <Text style={{ fontSize: 16, color: colors.ink }}>{value}</Text>
    </View>
  );
}

export default PlantMetaItem;
