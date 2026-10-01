import BottomSheet from '@/shared/components/BottomSheet';
import ButtonBlock from '@/shared/components/Buttons/ButtonBlock';
import ScreenHeading from '@/shared/components/ScreenHeading';
import { colors } from '@/shared/styles/colors';
import { useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import ColorPicker, { colorKit, HueSlider, Panel1, Preview, Swatches } from 'reanimated-color-picker';

type InputColorPickerProps = {
  value?: string;
  // Always called with a 6-digit uppercase hex code, e.g. '#F4A6C1'.
  onChange: (value: string) => void;
  label: string;
  // Quick picks shown under the spectrum.
  swatches?: string[];
  placeholder?: string;
};

const DEFAULT_COLOR = '#FFFFFF';

const toHex = (color: string) => colorKit.HEX(color).toUpperCase();

function Swatch({ color, size }: { color: string; size: number }) {
  return (
    <View style={{
      width: size,
      height: size,
      borderRadius: size / 2,
      backgroundColor: color,
      // Keeps light colors like white visible against the background.
      borderWidth: 1,
      borderColor: colors.dark1,
    }} />
  );
}

export default function InputColorPicker({
  value,
  onChange,
  label,
  swatches,
  placeholder = 'Select a color',
}: InputColorPickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  // The color being picked; only saved when "Done" is pressed.
  const [draft, setDraft] = useState(value || DEFAULT_COLOR);

  const open = () => {
    setDraft(value || DEFAULT_COLOR);
    setIsOpen(true);
  };

  const done = () => {
    onChange(toHex(draft));
    setIsOpen(false);
  };

  return (
    <View>
      <Text style={{
        fontWeight: 'bold',
        fontSize: 18,
        color: colors.dark,
        marginBottom: 10
      }}>{label}</Text>
      <Pressable
        onPress={open}
        accessibilityRole="button"
        accessibilityLabel={label}
        accessibilityValue={{ text: value }}
        style={({ pressed }) => ({
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: colors.white,
          borderRadius: 8,
          padding: 12,
          opacity: pressed ? 0.7 : 1,
        })}
      >
        <View style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
          {value ? <Swatch color={value} size={20} /> : null}
          <Text style={{color: value ? colors.dark : colors.dark1}}>
            {value || placeholder}
          </Text>
        </View>
        <Text style={{color: colors.dark1, fontSize: 20, lineHeight: 20}}>›</Text>
      </Pressable>

      <BottomSheet visible={isOpen} onClose={() => setIsOpen(false)}>
        <ScreenHeading title={label} level={2} paddingBottom={0}/>
        <ColorPicker
          value={draft}
          onCompleteJS={({ hex }) => setDraft(hex)}
          thumbSize={28}
          sliderThickness={28}
          style={{gap: 16}}
        >
          <Preview hideInitialColor colorFormat="hex" style={{height: 40, borderRadius: 8}} />
          <Panel1 style={{height: 180, borderRadius: 8}} />
          <HueSlider style={{borderRadius: 8}} />
          {swatches ? <Swatches colors={swatches} /> : null}
        </ColorPicker>
        <ButtonBlock onPress={done}>
          <Text>Done</Text>
        </ButtonBlock>
      </BottomSheet>
    </View>
  );
}
