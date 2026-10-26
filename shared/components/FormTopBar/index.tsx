import ButtonInline from '@/shared/components/Buttons/ButtonInline';
import SmallCapsText from '@/shared/components/SmallCapsText';
import { colors } from '@/shared/styles/colors';
import { View } from 'react-native';

type FormTopBarProps = {
  title: string;
  onCancel: () => void;
  onSave: () => void;
  saveDisabled?: boolean;
  cancelLabel?: string;
  saveLabel?: string;
};

// Cancel / title / save bar at the top of a form screen.
export default function FormTopBar({
  title,
  onCancel,
  onSave,
  saveDisabled = false,
  cancelLabel = 'cancel',
  saveLabel = 'save',
}: FormTopBarProps) {
  return (
    <View style={{
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'baseline',
      marginBottom: 24,
    }}>
      <ButtonInline onPress={onCancel}>
        <SmallCapsText>{cancelLabel}</SmallCapsText>
      </ButtonInline>
      <SmallCapsText size={12} color={colors.pencil} style={{marginBottom: 4}}>{title}</SmallCapsText>
      <ButtonInline onPress={onSave} disabled={saveDisabled}>
        <SmallCapsText>{saveLabel}</SmallCapsText>
      </ButtonInline>
    </View>
  );
}
