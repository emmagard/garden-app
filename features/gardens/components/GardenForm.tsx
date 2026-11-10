
import Input from '@/shared/components/Input';
import InputSheetSelect from '@/shared/components/InputSheetSelect';
import InputTitle from '@/shared/components/InputTitle';
import { lightOptions } from '@/shared/constants/lightOptions';
import { soilOptions } from '@/shared/constants/soilOptions';
import { View } from 'react-native';

export type GardenFormValues = {
  name: string;
  dimensions: string;
  light: string;
  soil: string;
};

export const emptyGardenFormValues : GardenFormValues = {
  name: '',
  dimensions: '',
  light: '',
  soil: ''
}

type GardenFormProps = {
  values: GardenFormValues;
  onChange: (values: GardenFormValues) => void;
};


function GardenForm({values, onChange}: GardenFormProps) {
  const setField = (field: keyof GardenFormValues) => (newVal: string) => {
    onChange({ ...values, [field]: newVal });
  };

  return (
    <View style={{
      paddingBottom: 12,
      marginBottom: 12,
      // borderBottomWidth: 1,
      // borderBottomColor: colors.black35,
      flexDirection: 'column',
      gap: 8,
    }}>
      <InputTitle 
        label="garden name"
        value={values.name}
        onChangeText={setField('name')}
      />
      <View style={{ flexDirection: 'row', gap: 10 }}>
        <InputSheetSelect
          options={lightOptions}
          label="light"
          placeholder="select"
          value={values.light}
          onChange={setField('light')}
        />
        <InputSheetSelect
          options={soilOptions}
          label="soil"
          placeholder="select"
          value={values.soil}
          onChange={setField('soil')}
        />
        <Input
          label="plot dimensions"
          value={values.dimensions}
          onChangeText={setField('dimensions')}
        />
      </View>
    </View>
  );
};

export default GardenForm;