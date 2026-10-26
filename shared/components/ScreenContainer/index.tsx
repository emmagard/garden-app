import { colors } from "@/shared/styles/colors";
import { ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type ScreenContainerProps = {
  children: React.ReactNode;
  // Wrap the screen in a ScrollView that still fills the viewport when content is short.
  scroll?: boolean;
};

export default function ScreenContainer({ children, scroll = false }: ScreenContainerProps) {
  const content = (
    <SafeAreaView style={{
      backgroundColor: colors.paper,
      display: 'flex',
      flexGrow: 1}}>
      <View style={{ paddingHorizontal: 20, paddingTop: 20 }}>
        {children}
      </View>
    </SafeAreaView>
  );

  if (!scroll) return content;

  return (
    <ScrollView style={{flexGrow: 1}} contentContainerStyle={{flexGrow: 1}}>
      {content}
    </ScrollView>
  );
}
