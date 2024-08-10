import { Player } from "@/types/player"
import { FlatList, ListRenderItem, Text, View } from "react-native"
import { playerPointStyles } from "./playerStyles"


interface PlayerPointProps {
  players: Player[] | undefined
}

const PlayerPoints: React.FC<PlayerPointProps> = ({ players }) => {
  const emptyPointPlayer = () => (<Text>0</Text>)

  const renderPointsPlayer: ListRenderItem<Player> = ({ item }) => (
    <View style={playerPointStyles.vPointPlayers}>
      <Text style={{ textAlign: "center" }}>{item.name}</Text>
      <View style={playerPointStyles.vTextPoints}>
        <FlatList
          ListEmptyComponent={emptyPointPlayer}
          contentContainerStyle={{ alignItems: "center" }}
          data={item.points}
          renderItem={({ item }) => (<Text>{item}</Text>)}
        />
        <View style={playerPointStyles.vDivisor} />
        <Text>
          {item.points.reduce((a, b) => a + b, 0)}
        </Text>
      </View>
    </View>
  )

  return (
    <FlatList
      horizontal
      pagingEnabled
      renderItem={renderPointsPlayer}
      keyExtractor={(item) => String(item.id)}
      data={players}
    />
  )

}

export default PlayerPoints