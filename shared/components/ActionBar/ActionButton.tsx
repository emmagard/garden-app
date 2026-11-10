import ButtonInline from '@/shared/components/Buttons/ButtonInline';
import SmallCapsText from '@/shared/components/SmallCapsText';

export default function ActionButton({ onPress, label }: { onPress: () => void; label: string }) {
  return (
    <ButtonInline onPress={onPress}>
      <SmallCapsText>{label}</SmallCapsText>
    </ButtonInline>
  );
}