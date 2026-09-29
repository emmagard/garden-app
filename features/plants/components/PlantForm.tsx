import Input from '@/shared/components/Input';
import { InputSelect } from '@/shared/components/InputSelect';
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
        <Input
          label="Color"
          value={values.color}
          onChangeText={setField('color')} />
        <InputSelect
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
