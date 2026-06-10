import ScreenContainer from '@/shared/components/ScreenContainer';
import ScreenHeading from '@/shared/components/ScreenHeading';
import OnboardingForm from './components/OnboardingForm';

export default function OnboardingScreen() {
  return (
    <ScreenContainer>
      <ScreenHeading title="Onboarding" />
      <OnboardingForm />
    </ScreenContainer>
  );
}
