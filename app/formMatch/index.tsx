import { Text, View } from "react-native"
import { formMatchStyles } from "./formMatchStyles"
import { SafeAreaView } from "react-native-safe-area-context"


const FormMatch = () => {

  return (
    <SafeAreaView>
      <View style={formMatchStyles.container}>
        <Text>Match name</Text>
      </View>
    </SafeAreaView>
  )
}

export default FormMatch
