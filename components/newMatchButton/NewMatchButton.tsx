import { Image, Pressable } from "react-native"
import NewMatchButtonImage from '@/assets/icons/newMatch.png';
import { NewMatchButtonStyles } from "./newMatchButtonStyle";

const NewMatchButton = () => {

  return (
    <>
      <Pressable 
      onPress={() => console.log('aui')}
      style={NewMatchButtonStyles.button}>
        <Image
          source={NewMatchButtonImage}
        />
      </Pressable>
    </>
  )
}

export default NewMatchButton