import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";


export default function ScreenContainer({ children }: { children: React.ReactNode }) {
  return (
    <SafeAreaView style={{backgroundColor: '#ffffff', marginTop: 10}}>
      <View style={{ paddingHorizontal: 20 }}>
        {children}
      </View>
    </SafeAreaView>
  );
}