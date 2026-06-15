import { colors } from '@/shared/styles/colors';
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";


export default function ScreenContainer({ children }: { children: React.ReactNode }) {
  return (
    <SafeAreaView style={{
      backgroundColor: colors.light,
      display: 'flex',
      flexGrow: 1}}>
      <View style={{ paddingHorizontal: 20 }}>
        {children}
      </View>
    </SafeAreaView>
  );
}