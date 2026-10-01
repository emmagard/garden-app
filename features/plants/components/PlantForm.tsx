import Input from '@/shared/components/Input';
import InputColorPicker from '@/shared/components/InputColorPicker';
import { colorSwatches } from '@/shared/constants/colorSwatches';
import InputSheetSelect from '@/shared/components/InputSheetSelect';
import { heightOptions } from '@/shared/constants/heightOptions';
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
      marginBottom: 30,
      flexDirection: 'column',
      gap: 20,
    }}>
        <Input
          label="Plant Name"
          value={values.name}
          onChangeText={setField('name')} />
        <Input
          label="Scientific Name"
          value={values.scientificName}
          onChangeText={setField('scientificName')} />
        <InputColorPicker
          swatches={colorSwatches}
          label="Color"
          value={values.color}
          onChange={setField('color')} />
        <InputSheetSelect
          options={heightOptions}
          label="Height"
          value={values.height}
          onChange={setField('height')} />
        <Input
          label="Width"
          value={values.width}
          onChangeText={setField('width')} />
    </View>
  );
}

export default PlantForm;
