import Input from '@/shared/components/Input';
import InputColorPicker from '@/shared/components/InputColorPicker';
import InputSheetSelect from '@/shared/components/InputSheetSelect';
import InputTitle from '@/shared/components/InputTitle';
import { colorSwatches } from '@/shared/constants/colorSwatches';
import { heightOptions } from '@/shared/constants/heightOptions';
import { colors } from '@/shared/styles/colors';
import { View } from 'react-native';

export type PlantFormValues = {
  name: string;
  scientificName: string;
  color: string;
  height: string;
  width: string;
};

export const emptyPlantFormValues: PlantFormValues = {
  name: '',
  scientificName: '',
  color: '',
  height: '',
  width: '',
};

type PlantFormProps = {
  values: PlantFormValues;
  onChange: (values: PlantFormValues) => void;
};

function PlantForm({ values, onChange }: PlantFormProps) {
  const setField = (field: keyof PlantFormValues) => (newVal: string) => {
    onChange({ ...values, [field]: newVal });
  };

  return (
    <View style={{
      paddingBottom: 12,
      marginBottom: 24,
      borderBottomWidth: 1,
      borderBottomColor: colors.black35,
      flexDirection: 'column',
      gap: 8,
    }}>
      <InputTitle
        label="plant name"
        value={values.name}
        onChangeText={setField('name')} />
      <Input
        label="scientific name"
        value={values.scientificName}
        onChangeText={setField('scientificName')} />
      <View style={{ flexDirection: 'row', gap: 10 }}>
        <View style={{ flex: 1 }}>
          <InputColorPicker
            swatches={colorSwatches}
            label="color"
            placeholder="select"
            value={values.color}
            onChange={setField('color')} />
        </View>
        <View style={{ flex: 1 }}>
          <InputSheetSelect
            options={heightOptions}
            label="height"
            placeholder="select"
            value={values.height}
            onChange={setField('height')} />
        </View>
        <View style={{ flex: 1 }}>
          <Input
            label="width"
            value={values.width}
            onChangeText={setField('width')} />
        </View>
      </View>
    </View>
  );
}

export default PlantForm;
