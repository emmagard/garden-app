import { colors } from '@/shared/styles/colors';
import { Pressable, Text } from 'react-native';

type SelectableRowProps = {
  label: string;
  selected: boolean;
  onPress: () => void;
  disabled?: boolean;
  // 'checkbox' for multi-select lists, 'radio' for pick-one lists.
  accessibilityRole?: 'checkbox' | 'radio';
};

export default function SelectableRow({
  label,
  selected,
  onPress,
  disabled = false,
  accessibilityRole = 'checkbox',
}: SelectableRowProps) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      accessibilityRole={accessibilityRole}
      accessibilityState={{ checked: selected, disabled }}
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: colors.paperLight,
        borderBottomWidth: 1,
        borderColor: selected ? colors.greenDark : colors.black35,
        paddingTop: 16,
        paddingBottom: 6,
        opacity: disabled ? 0.5 : 1,
      }}
    >
      <Text style={{color: colors.dark, fontSize: 16, fontWeight: selected ? '600' : 'normal'}}>{label}</Text>
      <Text style={{color: colors.dark, fontSize: 16}}>{selected ? '✓' : ''}</Text>
    </Pressable>
  );
}
