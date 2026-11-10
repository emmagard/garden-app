import { View } from 'react-native';

type ActionBarProps = {
  children: React.ReactNode;
};

export default function ActionBar({
  children
}: ActionBarProps) {
  return (
    <View style={{
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'baseline',
      marginBottom: 24,
    }}>
      {children}
    </View>
  );
}
