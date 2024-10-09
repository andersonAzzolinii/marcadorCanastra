import { Text, TouchableOpacity, View } from "react-native"
import { NewMatchButtonStyles } from "./newMatchButtonStyle";
import { router } from "expo-router";

const NewMatchButton = () => {
  const handleClick = () => {
    router.push({
      pathname: '/formMatch',
    });
  }
  return (
    <TouchableOpacity onPress={handleClick} style={NewMatchButtonStyles.vLink} >
      <Text style={NewMatchButtonStyles.text}>+</Text>
    </TouchableOpacity>
  )
}

export default NewMatchButton