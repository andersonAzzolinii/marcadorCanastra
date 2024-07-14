import { Image, View } from "react-native"
import NewMatchButtonImage from '@/assets/icons/newMatch.png';
import { NewMatchButtonStyles } from "./newMatchButtonStyle";
import { Link } from "expo-router";

const NewMatchButton = () => {
  return (
    <Link push href={"/formMatch"} style={NewMatchButtonStyles.vLink}>
      <View >
        <Image source={NewMatchButtonImage} />
      </View>
    </Link>
  )
}

export default NewMatchButton