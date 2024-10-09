import { History, HistoryItem, MatchesList } from "@/types/match"
import { FlatList, Image, ListRenderItem, Modal, Pressable, Text, View } from "react-native"
import { historyStyle } from "./historyStyle"
import Close from '@/assets/icons/close.png'
import Winner from '@/lotties/winner.json'
import Loser from '@/lotties/loser.json'
import { formatDate } from "@/util/DateUtil"
import LottieView from "lottie-react-native"

const HistoryMatch = ({
  history,
  showHistory,
  setShowHistory }:
  {
    history: History[] | undefined,
    showHistory: boolean,
    setShowHistory: React.Dispatch<React.SetStateAction<boolean>>
  }) => {

  const renderPlayersHistory: ListRenderItem<HistoryItem> = ({ item },) => (
    <View style={historyStyle.vPlayers}>
      <View style={historyStyle.vPoints}>
        <LottieView
          autoPlay
          style={historyStyle.imageUser}
          source={item.winner ? Winner : Loser}
        />
        <View style={{ flex: 1 }}>
          <Text style={item.winner ?
            [historyStyle.textPlayer, historyStyle.textWinner] :
            [historyStyle.textPlayer, historyStyle.textLoser]}
          >
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
  )

  const renderItemHistory: ListRenderItem<MatchesList> = ({ item }) => (
    <View style={{ marginBottom: 20 }}>
      <FlatList
        data={item.players}
        renderItem={renderPlayersHistory}
      />
    </View>
  )

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
  )

  return (
    <Modal
      transparent
      animationType="slide"
      visible={showHistory}
      onRequestClose={() => setShowHistory(false)}
    >
      <View style={historyStyle.containerHistories}>
        <View style={historyStyle.contentContainer}>
          <View style={historyStyle.vHeader}>
            <Text style={historyStyle.textTitle}>Histórico</Text>
            <Pressable onPress={() => setShowHistory(false)}>
              <Image
                source={Close}
              />
            </Pressable>
          </View>
          <FlatList
            data={history}
            keyExtractor={(_, index) => String(index)}
            renderItem={renderListHistory}
          />
        </View>
      </View>
    </Modal>
  )
}

export default HistoryMatch