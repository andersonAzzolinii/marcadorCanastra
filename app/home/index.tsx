import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import homeStyle from './homeStyle';

export default function Home() {
  return (
    <SafeAreaView  >
      <View style={homeStyle.container}>
        <Text>Home page</Text>
      </View>
    </SafeAreaView>
  )
}
