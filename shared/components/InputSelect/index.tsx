import { colors } from '@/shared/styles/colors';
import { Picker } from '@react-native-picker/picker';
import React, { useRef, useState } from 'react';
import {
  Animated,
  Modal,
  Platform,
  StyleSheet,
  Text, TouchableOpacity,
  View
} from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";

export interface SelectOption {
  label: string
  value: string
  disabled?: boolean
  enabled?: boolean
  color?: string
}

export interface SelectInputProps {
  options: SelectOption[]
  value?: string
  onChange: (value: string) => void
  placeholder?: string
  label?: string
  error?: string
  disabled?: boolean
  mode?: 'dialog' | 'dropdown'  // Android only
}

export function InputSelect({
  options,
  value,
  onChange,
  placeholder = 'Select an option',
  label,
  error,
  disabled = false,
  mode = 'dialog'
}: SelectInputProps) {
  const [open, setOpen] = useState(false)
  const chevronAnim = useRef(new Animated.Value(0)).current

  const selected = options.find(o => o.value === value)

  const toggle = () => {
    if (disabled) return
    const next = !open
    setOpen(next)
    Animated.spring(chevronAnim, {
      toValue: next ? 1 : 0,
      useNativeDriver: true,
    }).start()
  }

  const select = (opt: string) => {
    onChange(opt)
    toggle()
  }

  const chevronRotate = chevronAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  })

  return (
    <View>
      {label && <Text style={styles.label}>{label}</Text>}

      <TouchableOpacity
        style={[styles.trigger,
          open && styles.triggerOpen,
          error && styles.triggerError,
          disabled && styles.triggerDisabled]}
        onPress={toggle}
        activeOpacity={0.7}
        accessibilityRole="combobox"
        accessibilityState={{ expanded: open, disabled }}
        accessibilityLabel={label}
      >
        <Text style={[styles.value,
          !selected && styles.placeholder]}
        >
          {selected?.label ?? placeholder}
        </Text>
        <Animated.Text style={[
          styles.chevron,
          { transform: [{ rotate: chevronRotate }] }
        ]}>
          ›
        </Animated.Text>
      </TouchableOpacity>

      {error && <Text style={styles.error}>{error}</Text>}
       
      <Modal
        visible={open}
        transparent={true}
        animationType="fade"
        onRequestClose={toggle}
      >
        <SafeAreaView style={{flex: 1,
          justifyContent: 'flex-end',
          backgroundColor: colors.black35,
        }}>
          <View style={[
            styles.pickerWrap,
            error && styles.pickerWrapError,
            disabled && styles.pickerWrapDisabled,
          ]}>
            <Picker
              selectedValue={selected?.value}
              onValueChange={select}
              enabled={!disabled}
              mode={Platform.OS === 'android' ? mode : undefined}
              style={styles.picker}
              itemStyle={styles.pickerItem}
              accessibilityLabel={label}
            >
              {placeholder && (
                <Picker.Item
                  label={placeholder}
                  value=""
                  enabled={false}
                  color={Platform.OS === 'ios' ? '#8e8e93' : '#9CA3AF'}
                />
              )}
              {options.map((opt) => (
                <Picker.Item
                  key={opt.value}
                  label={opt.label}
                  value={opt.value}
                  enabled={opt.enabled !== false}
                  color={opt.color}
                />
              ))}
            </Picker>
          </View>
        </SafeAreaView>
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  label: {
    fontSize: 18,
    fontWeight: 'bold', 
    color: colors.dark,
    marginBottom: 8 
  },
  trigger:          {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    borderWidth: 0,
    backgroundColor: '#fff',
    borderRadius: 8,
  },
  triggerOpen: {
    borderColor: '#6366F1',
    shadowColor: '#6366F1',
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2
  },
  triggerError:     { borderColor: '#EF4444' },
  triggerDisabled:  { backgroundColor: '#F9FAFB', opacity: 0.6 },
  value:            { fontSize: 15, color: '#111827' },
  placeholder:      { color: '#9CA3AF' },
  chevron:          { fontSize: 20, color: '#9CA3AF', lineHeight: 22 },
  error:            { fontSize: 12, color: '#EF4444' },
  overlay:          { flex: 1, backgroundColor: 'rgba(0,0,0,0.4)',
                      justifyContent: 'flex-end' },
  sheet:            { backgroundColor: '#fff', borderTopLeftRadius: 20,
                      borderTopRightRadius: 20, paddingBottom: Platform.OS === 'ios' ? 34 : 16,
                      maxHeight: '60%' },
  handle:           { width: 36, height: 4, borderRadius: 2,
                      backgroundColor: '#D1D5DB', alignSelf: 'center',
                      marginTop: 10, marginBottom: 8 },
  sheetTitle:       { fontSize: 13, fontWeight: '600', color: '#6B7280',
                      paddingHorizontal: 16, paddingBottom: 10,
                      textTransform: 'uppercase', letterSpacing: 0.6 },
  option:           { flexDirection: 'row', alignItems: 'center',
                      justifyContent: 'space-between',
                      paddingHorizontal: 16, paddingVertical: 14 },
  optionDisabled:   { opacity: 0.4 },
  optionText:       { fontSize: 15, color: '#111827' },
  optionSelected:   { color: '#6366F1', fontWeight: '600' },
  optionDisabledText: { color: '#9CA3AF' },
  checkmark:        { fontSize: 15, color: '#6366F1' },
  sep:              { height: 1, backgroundColor: '#F3F4F6',
                      marginHorizontal: 16 },

pickerWrap: {
    display: 'flex',
    justifyContent: 'flex-end',
    borderWidth: 1,
    borderColor: colors.black,
    backgroundColor: '#fff',
    // Android needs overflow hidden to clip the Picker
    overflow: 'hidden',
  },
  pickerWrapError: {
    borderColor: '#EF4444',
  },
  pickerWrapDisabled: {
    backgroundColor: '#F9FAFB',
    opacity: 0.6,
  },
  picker: {
    // iOS: Picker renders a full drum-roll spinner inline
    // Android: renders a single-row tap target
    ...Platform.select({
      ios: { height: 180 },
      android: { height: 48, color: colors.black },
    }),
  },
  pickerItem: {
    // iOS only — controls the drum-roll item appearance
    fontSize: 18,
    color: colors.black,
  },
});