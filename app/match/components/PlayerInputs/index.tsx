import DefaultButton from "@/components/button";
import DefaultTextInput from "@/components/Input";
import { FlatList, Image, ListRenderItem, Pressable, Text, View, ViewToken } from "react-native"
import { playerInputStyles } from "./playerInputsStyles";
import ArrowLeft from "@/assets/icons/lArrow.png"
import ArrowRight from "@/assets/icons/rArrow.png"
import { Dispatch, FC, SetStateAction, useRef, useState } from "react";
import { PointService } from "@/services/points";
import { Player } from "@/types/player";
import { MatchInfo } from "@/types/match";


interface PlayerInputProps {
  match: MatchInfo | undefined;
  setMatch: Dispatch<SetStateAction<MatchInfo | undefined>>
}

const PlayerInputs: FC<PlayerInputProps> = ({ match, setMatch }) => {
  const refListInputPlayers = useRef<FlatList>(null);
  const servicePoints = new PointService()
  const [currentIndex, setCurrentIndex] = useState(0);

  const onViewableItemsChanged = ({ viewableItems }: { viewableItems: ViewToken[] }) => {
    if (viewableItems.length > 0) {
      if (Number(viewableItems[0].index !== currentIndex)) {
        setCurrentIndex(Number(viewableItems[0].index));
      }
    }
  };

  const scrollToIndex = (index: number) => {
    if (refListInputPlayers.current) {
      setCurrentIndex(index)
      refListInputPlayers?.current.scrollToIndex({ index, animated: true });
    }
  };

  const handleChangeTextPoints = (e: any, index: number) => {
    if (match) {
      const updatedMatch = { ...match };
      const player = updatedMatch.players[index];
      player.actualy_point = e;
      setMatch(updatedMatch);
    }
  }


  const handleClickAddPoint = async (index: number) => {
    try {
      if (match) {
        const updatedMatch = { ...match };
        const player = updatedMatch.players[index];
        const point = Number(player.actualy_point);

        if (point) {
          player.points.push(point)
          await servicePoints.update(player.id, player.points)
          player.actualy_point = '';
          setMatch(updatedMatch);
        }
      }
    } catch (error) {
      console.error(`error to add new point to the player ${error}`)
    }
  }
  const handleRemoveLastPoint = async (index: number) => {
    try {
      if (match) {
        const updatedMatch = { ...match };
        const player = updatedMatch.players[index];

        player.points.pop()
        await servicePoints.update(player.id, player.points)
        setMatch(updatedMatch);
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
          <DefaultButton text="Adicionar" style={playerInputStyles.button} onPress={() => handleClickAddPoint(index)} />
          <DefaultButton
            onPress={() => handleRemoveLastPoint(index)}
            text="Remover ultimo ponto"
            style={[playerInputStyles.button, { backgroundColor: 'red' }]} />
        </View>
      </View>

    </>
  );

  return (
    <>

      <FlatList
        contentContainerStyle={playerInputStyles.bottomListContent}
        horizontal
        ref={refListInputPlayers}
        pagingEnabled
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