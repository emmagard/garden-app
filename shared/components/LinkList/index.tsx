import { View } from 'react-native';

function LinkList({ children }: { children: React.ReactNode }) {
  return (
    <View style={{ marginTop: 20 }}>
      {children}
    </View>
  );
}

export default LinkList;