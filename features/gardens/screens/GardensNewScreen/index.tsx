import ButtonLink from '@/shared/components/ButtonLink';
import Input from '@/shared/components/Input';
import ScreenContainer from '@/shared/components/ScreenContainer';
import ScreenHeading from '@/shared/components/ScreenHeading';
import { useState } from 'react';
import { Text } from 'react-native';


export default function GardensNewScreen() {
  const [name, setName] = useState('');
  
  return (
    <ScreenContainer>
      <ScreenHeading title="Add a new garden" />
      <Input label='Add a name for your garden' placeholder='Garden name' onChangeText={(newVal) => {setName(newVal)}}></Input>
      <ButtonLink href='/gardens/single'><Text>Save</Text></ButtonLink>
    </ScreenContainer>
  );
}
