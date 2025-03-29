import { History, HistoryItem, MatchesList } from "@/types/match";
import { FlatList, Image, ListRenderItem, Modal, Pressable, Text, View, Animated } from "react-native";
import { historyStyle } from "./historyStyle";
import Close from '@/assets/icons/close.png';
import Winner from '@/lotties/winner.json';
import Loser from '@/lotties/loser.json';
import { formatDate } from "@/util/DateUtil";
import LottieView from "lottie-react-native";
import React, { useEffect, useState, useRef } from "react";
import { PanGestureHandler, GestureHandlerRootView } from 'react-native-gesture-handler';

interface PlayerVictory {
  player_name: string;
  total_victories: number;
}

const HistoryMatch = React.memo(({
  history,
  showHistory,
  setShowHistory
}: {
  history: History[] | undefined,
  showHistory: boolean,
  setShowHistory: React.Dispatch<React.SetStateAction<boolean>>
}) => {
  const [victoriesArray, setVictoriesArray] = useState<PlayerVictory[]>([]);
  const translateY = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const victories: Record<string, number> = {};
    history?.forEach((entry) => {
      entry?.matches?.forEach((match) => {
        match.players?.forEach(({ winner, player_name }) => {
          if (winner === 1 && player_name) {
            victories[player_name] = (victories[player_name] || 0) + 1;
          }
        });
      });
    });

    const updatedVictoriesArray: PlayerVictory[] = Object.keys(victories).map((player_name) => ({
      player_name,
      total_victories: victories[player_name],
    }));

    setVictoriesArray(updatedVictoriesArray);
  }, [history]);

  useEffect(() => {
    if (showHistory)
      translateY.setValue(0)
  }, [showHistory]);

  const handleGesture = Animated.event(
    [{ nativeEvent: { translationY: translateY } }],
    { useNativeDriver: true }
  );

  const handleGestureEnd = (event: any) => {
    if (event.nativeEvent.translationY > 150) { // 25% da altura aproximada
      setShowHistory(false);
    } else {
      Animated.spring(translateY, {
        toValue: 0,
        useNativeDriver: true,
      }).start();
    }
  };

  const emptyRender = () => (
    <View style={{ justifyContent: 'center', alignItems: "center" }}>
      <Text style={{ fontSize: 20 }}>Nenhum histórico encontrado.</Text>
    </View>
  );

  const renderPlayersHistory: ListRenderItem<HistoryItem> = ({ item }) => (
    <View style={historyStyle.vPlayers}>
      <View style={historyStyle.vPoints}>
        <LottieView
          autoPlay
          style={historyStyle.imageUser}
          source={item.winner ? Winner : Loser}
        />
        <View style={{ flex: 1 }}>
          <Text style={item.winner ? [historyStyle.textPlayer, historyStyle.textWinner] : [historyStyle.textPlayer, historyStyle.textLoser]}>
            {item.player_name}
          </Text>
        </View>
        <View style={historyStyle.vTexPoints}>
          <Text style={item.winner ? historyStyle.textWinner : historyStyle.textLoser}>
            {item.points}
          </Text>
        </View>
      </View>
    </View>
  );

  const renderItemHistory: ListRenderItem<MatchesList> = ({ item }) => (
    <View style={{ marginBottom: 20 }}>
      <FlatList
        data={item.players}
        renderItem={renderPlayersHistory}
      />
    </View>
  );

  const renderListHistory: ListRenderItem<History> = ({ item }) => (
    <>
      <View style={historyStyle.vDateHistory}>
        <Text style={historyStyle.textDate}>
          {formatDate(new Date(item.finished_date || ''), 'dd/MM/yyyy')}
        </Text>
      </View>
      <FlatList
        data={item.matches}
        renderItem={renderItemHistory}
      />
    </>
  );

  return (
    <Modal
      transparent
      animationType="slide"
      visible={showHistory}
      onRequestClose={() => setShowHistory(false)}
    >
      <GestureHandlerRootView style={{ flex: 1 }}>
        <PanGestureHandler onGestureEvent={handleGesture} onEnded={handleGestureEnd}>
          <Animated.View style={[historyStyle.containerHistories, { transform: [{ translateY }] }]}>
            <View style={historyStyle.contentContainer}>
              <View style={historyStyle.vHeader}>
                <Text style={historyStyle.textTitle}>Histórico</Text>
                <Pressable onPress={() => setShowHistory(false)}>
                  <Image source={Close} />
                </Pressable>
              </View>
              <View style={{ marginLeft: 60, gap: 5, marginVertical: 20 }}>
                {victoriesArray?.map(item => (
                  <Text key={item.player_name} style={historyStyle.textTotalWinners}>
                    {item.player_name} possuí {item.total_victories} vitória(s)
                  </Text>
                ))}
              </View>
              <FlatList
                data={history}
                ListEmptyComponent={emptyRender}
                keyExtractor={(_, index) => String(index)}
                renderItem={renderListHistory}
              />
            </View>
          </Animated.View>
        </PanGestureHandler>
      </GestureHandlerRootView>
    </Modal>
  );
});

export default HistoryMatch;
