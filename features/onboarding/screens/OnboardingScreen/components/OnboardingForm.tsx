import ButtonLink from '@/shared/components/Buttons/ButtonLink';
import useSession from '@/shared/store/useSession';
import { useState } from 'react';
import { Switch, Text, View } from 'react-native';

export default function OnboardingForm() {
  const { setCompletedOnboarding, hasCompletedOnboarding } = useSession();
  const [isSwitchOn, setIsSwitchOn] = useState(hasCompletedOnboarding);

  return (
    <View>
      <Text>Onboarding Form</Text>
      <Switch
        value={isSwitchOn}
        onValueChange={(newValue) => { setIsSwitchOn(newValue); }}
      />
      <Text>{isSwitchOn ? 'Onboarding Completed' : 'Onboarding Not Completed'}</Text>
      <ButtonLink
        href="/account"
        disabled={!isSwitchOn}
        onPress={() => setCompletedOnboarding(true)}
      >
        <Text>Go to your account</Text>
      </ButtonLink>
    </View>
  );
}