import BottomSheet from '@/shared/components/BottomSheet';
import ScreenHeading from '@/shared/components/ScreenHeading';
import { colors } from '@/shared/styles/colors';
import { useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import InputLabel from '../InputLabel';

export type SheetSelectOption = {
  label: string;
  value: string;
  disabled?: boolean;
};

type InputSheetSelectProps = {
  options: SheetSelectOption[];
  value?: string;
  onChange: (value: string) => void;
  label: string;
  placeholder?: string;
};

export default function InputSheetSelect({
  options,
  value,
  onChange,
  label,
  placeholder = 'Select an option',
}: InputSheetSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const selected = options.find(option => option.value === value);

  const select = (optionValue: string) => {
    onChange(optionValue);
    setIsOpen(false);
  };

  return (
    <View style={{flex: 1}}>
      <InputLabel>{label}</InputLabel>
      <Pressable
        onPress={() => setIsOpen(true)}
        accessibilityRole="combobox"
        accessibilityLabel={label}
        accessibilityValue={{ text: selected?.label }}
        accessibilityState={{ expanded: isOpen }}
        style={({ pressed }) => ({
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: colors.paperLight,
          borderRadius: 8,
          borderWidth: 1,
          borderColor: colors.black35,
          paddingHorizontal: 10,
          paddingVertical: 6,
          opacity: pressed ? 0.7 : 1,
        })}
      >
        <Text style={{color: selected ? colors.ink : colors.dark1, fontSize: 12}}>
          {selected?.label ?? placeholder}
        </Text>
        <Text style={{color: colors.dark1, fontSize: 20, lineHeight: 20}}>›</Text>
      </Pressable>

      <BottomSheet visible={isOpen} onClose={() => setIsOpen(false)}>
        <ScreenHeading title={label} level={2} paddingBottom={0}/>
        <ScrollView contentContainerStyle={{gap: 12}}>
          {options.map(option => {
            const isSelected = option.value === value;

            return (
              <Pressable
                key={option.value}
                onPress={() => select(option.value)}
                disabled={option.disabled}
                accessibilityRole="radio"
                accessibilityState={{ checked: isSelected, disabled: option.disabled }}
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  backgroundColor: isSelected ? colors.greenLight : colors.white,
                  borderRadius: 8,
                  paddingVertical: 16,
                  paddingHorizontal: 16,
                  opacity: option.disabled ? 0.5 : 1,
                }}
              >
                <ScreenHeading title={option.label} level={3} paddingBottom={0}/>
                <Text style={{color: colors.dark, fontSize: 18}}>{isSelected ? '✓' : ''}</Text>
              </Pressable>
            );
          })}
        </ScrollView>
      </BottomSheet>
    </View>
  );
}
