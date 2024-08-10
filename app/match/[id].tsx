import { MatchService } from "@/services/match";
import { PointService } from "@/services/points";
import { MatchInfo } from "@/types/match";
import { Player } from "@/types/player";
import { useLocalSearchParams } from "expo-router";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  FlatList,
  Image,
  ListRenderItem,
  Pressable,
  Text,
  View,
  ViewToken
} from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import matchStyles from "./matchStyles";
import DefaultTextInput from "@/components/Input";
import DefaultButton from "@/components/button";
import ArrowLeft from "@/assets/icons/lArrow.png"
import ArrowRight from "@/assets/icons/rArrow.png"
import PlayerPoints from "./components/PlayerPoints";

const Match = () => {
  const { id } = useLocalSearchParams();
  const serviceMatch = new MatchService()
  const servicePoints = new PointService()

  const [match, setMatch] = useState<MatchInfo | undefined>()
  const refListInputPlayers = useRef<FlatList>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    getMatches()
  }, [id])

  const getMatches = useCallback(async () => {
    const match = await serviceMatch.findPerId(Number(id));
    match && setMatch(match);
  }, [id]);

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


  const scrollToIndex = (index: number) => {
    if (refListInputPlayers.current) {
      setCurrentIndex(index)
      refListInputPlayers?.current.scrollToIndex({ index, animated: true });
    }
  };

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
      <View style={matchStyles.vInputPointPlayers}>
        <View style={matchStyles.vTextPoints}>
          <Text>{item.name}</Text>
          <DefaultTextInput
            value={item.actualy_point}
            style={matchStyles.inputText}
            keyboardType="number-pad"
            onChangeText={(e) => handleChangeTextPoints(e, index)}
          />
          <DefaultButton text="Adicionar" style={matchStyles.button} onPress={() => handleClickAddPoint(index)} />
          <DefaultButton
            onPress={() => handleRemoveLastPoint(index)}
            text="Remover ultimo ponto"
            style={[matchStyles.button, { backgroundColor: 'red' }]} />
        </View>
      </View>

    </>
  );
  const onViewableItemsChanged = ({ viewableItems }: { viewableItems: ViewToken[] }) => {
    if (viewableItems.length > 0) {
      if (Number(viewableItems[0].index !== currentIndex)) {
        setCurrentIndex(Number(viewableItems[0].index));
      }
    }
  };

  return (
    <SafeAreaView style={matchStyles.safeArea}>
      <View style={matchStyles.container}>
        <Text style={matchStyles.matchName}>{match?.name}</Text>
        <Text style={matchStyles.maxPointsText}>Até {match?.max_points} pontos</Text>
        <View style={matchStyles.topListContainer}>
          <PlayerPoints
            players={match?.players}
          />
        </View>

        <View style={matchStyles.bottomListContainer}>
          {
            currentIndex !== 0 &&
            <Pressable
              onPress={() => scrollToIndex(currentIndex - 1)}
              style={matchStyles.vArrows} >
              <Image source={ArrowLeft} />
            </Pressable>
          }
          {
            currentIndex + 1 !== match?.players.length &&
            <Pressable
              onPress={() => scrollToIndex(currentIndex + 1)}
              style={[matchStyles.vArrows, matchStyles.vArrowRight]}>
              <Image source={ArrowRight} />
            </Pressable>
          }

          <FlatList
            contentContainerStyle={matchStyles.bottomListContent}
            horizontal
            ref={refListInputPlayers}
            pagingEnabled
            onViewableItemsChanged={onViewableItemsChanged}
            renderItem={renderInputPointsPlayer}
            keyExtractor={(item) => String(item.id)}
            data={match?.players}
            snapToAlignment="center"
            decelerationRate="fast"
          />
        </View>
      </View>
    </SafeAreaView>
  )
}

export default Match;
