import { MatchInfo } from "@/types/match"
import { View } from "react-native"

const { Text } = require("react-native")

interface CardMatchProps {
  item: Partial<MatchInfo>
}

const CardMatch: React.FC<CardMatchProps> = ({ item }) => {
  return (
    <View>
      <Text>{item.name}</Text>
    </View>
  )
}

export default CardMatch