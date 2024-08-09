import { MatchService } from "@/services/match";
import { MatchInfo } from "@/types/match";
import { Player } from "@/types/player";
import { useLocalSearchParams } from "expo-router";
import { useCallback, useEffect, useRef, useState } from "react";
import { FlatList, Image, ListRenderItem, NativeScrollEvent, NativeSyntheticEvent, Pressable, Text, View, ViewToken } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import matchStyles from "./matchStyles";
import DefaultTextInput from "@/components/Input";
import DefaultButton from "@/components/button";
import ArrowLeft from "@/assets/icons/lArrow.png"
import ArrowRight from "@/assets/icons/rArrow.png"

const Match = () => {
  const { id } = useLocalSearchParams();
  const serviceMatch = new MatchService()

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

  const handleClickAddPoint = (index: number) => {
    if (match) {
      const updatedMatch = { ...match };
      const player = updatedMatch.players[index];
      const point = Number(player.actualy_point ?? 0);

      if (point) {
        player.actualy_point = '';
        player.points = [...player.points, point];
        setMatch(updatedMatch);
      } else {
        console.log('sem ponto');
      }
    }
  }

  const scrollToIndex = (index: number) => {
    if (refListInputPlayers.current) {
      setCurrentIndex(index)
      refListInputPlayers?.current.scrollToIndex({ index, animated: true });
    }
  };

  const renderPointsPlayer: ListRenderItem<Player> = ({ item }) => (
    <View style={matchStyles.vPointPlayers}>
      <Text>{item.name}</Text>
      <View style={matchStyles.vTextPoints}>
        <Text>
          {item.points.length > 0 ? item.points.map(point => (<Text key={point}>{point} </Text>)) : <Text>0</Text>}
        </Text>
        <View style={matchStyles.vDivisor} />
        <Text>
          {item.points.reduce((a, b) => a + b, 0)}
        </Text>
      </View>
    </View>
  )


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
          <DefaultButton text="Remover ultimo ponto" style={[matchStyles.button, { backgroundColor: 'red' }]} />
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
        <View style={matchStyles.topListContainer}>
          <FlatList
            horizontal
            pagingEnabled
            renderItem={renderPointsPlayer}
            keyExtractor={(item) => String(item.id)}
            data={match?.players}
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
