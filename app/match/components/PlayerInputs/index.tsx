import DefaultButton from "@/components/button"
import DefaultTextInput from "@/components/Input"
import { FlatList, ListRenderItem, Text, View, ViewToken } from "react-native"
import { playerInputStyles } from "./playerInputsStyles"
import { Dispatch, FC, SetStateAction, useRef, useState } from "react"
import { PointService } from "@/services/points"
import { Player } from "@/types/player"
import { MatchInfo } from "@/types/match"
import { useNotification } from "@/contexts/Notification"


interface PlayerInputProps {
  match: MatchInfo | undefined
  setMatch: Dispatch<SetStateAction<MatchInfo | undefined>>
}

const PlayerInputs: FC<PlayerInputProps> = ({ match, setMatch }) => {
  const refListInputPlayers = useRef<FlatList>(null)
  const servicePoints = new PointService()
  const [currentIndex, setCurrentIndex] = useState(0)
  const { notify } = useNotification()

  const onViewableItemsChanged = ({ viewableItems }: { viewableItems: ViewToken[] }) => {
    if (viewableItems.length > 0) {
      if (Number(viewableItems[0].index !== currentIndex)) {
        setCurrentIndex(Number(viewableItems[0].index))
      }
    }
  }

  const handleChangeTextPoints = (e: any, index: number) => {
    if (match) {
      const updatedMatch = { ...match }
      const player = updatedMatch.players[index]
      player.actualy_point = e
      setMatch(updatedMatch)
    }
  }

  const handleClickAddPoint = async (index: number) => {
    try {
      if (match) {
        const updatedMatch = { ...match }
        const player = updatedMatch.players[index]
        const point = Number(player.actualy_point)

        if (point || point === 0) {
          player.points.push(point)
          await servicePoints.update(player.id, player.points)
          player.actualy_point = ''
          setMatch(updatedMatch)
        } else notify('error', 'Digite ao menos um ponto.')
      }
    } catch (error) {
      notify('error', 'Problema ao inserir ponto.')
      console.error(`error to add new point to the player ${error}`)
    }
  }
  const handleRemoveLastPoint = async (index: number) => {
    try {
      if (match) {
        const updatedMatch = { ...match }
        const player = updatedMatch.players[index]

        if (player.points.length === 0)
          return notify('error', "Não temos pontos para remover.")

        player.points.pop()
        await servicePoints.update(player.id, player.points)
        setMatch(updatedMatch)
      }
    } catch (error) {
      console.error(`Error to delete player point.. ${error}`)
    }
  }


  const renderInputPointsPlayer: ListRenderItem<Player> = ({ item, index }) => (
    <>
      <View style={playerInputStyles.vInputPointPlayers}>
        <View style={playerInputStyles.vTextPoints}>
          <Text style={playerInputStyles.playerName}>{item.name}</Text>
          <DefaultTextInput
            value={item.actualy_point}
            style={playerInputStyles.inputText}
            keyboardType="number-pad"
            onChangeText={(e) => handleChangeTextPoints(e, index)}
          />
          <DefaultButton
            text="Adicionar"
            style={playerInputStyles.button}
            onPress={() => handleClickAddPoint(index)} />
          <DefaultButton
            textStyle={{ fontSize: 18, marginHorizontal: 5, }}
            onPress={() => handleRemoveLastPoint(index)}
            text="Remover ultimo ponto"
            style={[playerInputStyles.button, { backgroundColor: 'red' }]} />
        </View>
      </View>

    </>
  )

  return (
    <>
      <FlatList
        horizontal
        ref={refListInputPlayers}
        pagingEnabled
        keyboardShouldPersistTaps="handled"
        onViewableItemsChanged={onViewableItemsChanged}
        renderItem={renderInputPointsPlayer}
        keyExtractor={(item) => String(item.id)}
        data={match?.players}
        showsHorizontalScrollIndicator
      />
    </>
  )
}

export default PlayerInputs