import DefaultButton from '@/components/button';
import { useState } from 'react';
import { HistoryService } from '@/services/history'
import { MatchService } from '@/services/match'
import { View, Text, Modal, Pressable, TouchableWithoutFeedback, Dimensions, StyleSheet } from 'react-native';
import { popupWinnerStyles } from './popupWinnerStyles';
import { Player } from '@/types/player';
import LottieView from 'lottie-react-native';
import Bad from '@/lotties/bad.json'
import Winner from '@/lotties/winner.json'
import { messagesWinner } from '@/util/WinnerMessages';
import { HistoryItem, Match, MatchInfo } from '@/types/match';
import WinnerMatch from '@/lotties/winMatch.json'
import { Colors } from '@/constants/Colors';
interface PopupWinnerProps {
  visible: boolean;
  onHidden?: () => void;
  onCancel: () => void;
  players: Player[] | undefined;
  setMatch: React.Dispatch<React.SetStateAction<MatchInfo | undefined>>;
  match: MatchInfo | undefined
}


const PopupWinner: React.FC<PopupWinnerProps> = ({ visible, onCancel, players, match, setMatch }) => {

  const [winner, setWinner] = useState<Partial<Player>>({})
  const [finishedMatch, setFinishedMatch] = useState(false)
  const serviceHistory = new HistoryService()
  const serviceMatch = new MatchService()
  const { width, height } = Dimensions.get('screen');

  const verifyWinner = () => {
    let points = 0
    let winner = {}
    players?.forEach(player => {
      const totalPoints = player.points.reduce((a, b) => (a + b), 0)
      if (totalPoints > points) {
        points = totalPoints
        winner = player
      }
    })
    setWinner(winner)
  }

  const getMessage = () => messagesWinner[Math.floor(Math.random() * messagesWinner.length)]

  const resetMatch = async () => {
    const newValuesMatches = await serviceMatch.findPerId(match?.id ?? 0)
    setMatch(newValuesMatches)
    setWinner({})
    onCancel()
    setFinishedMatch(false)
  }

  const declareWinner = async () => {
    const arrHistory: HistoryItem[] = players?.map(e => {
      return {
        id_player: e.id,
        player_name: e.name,
        finished_date: null,
        id_match: match?.id,
        winner: winner.id === e.id ? 1 : 0,
        points: e.points.reduce((a, b) => a + b, 0),
        id: null,
        group_history: null,
      };
    }) ?? [];
    const insertHistory = await serviceHistory.insert(arrHistory)
    if (insertHistory)
      resetMatch()

  }

  const renderLottie = (badPlayer: boolean, totalPoints: number, player: Player) => (
    <View style={popupWinnerStyles.container}>
      <View>
        <Text style={popupWinnerStyles.fontName}>{player.name}</Text>
        <Text style={popupWinnerStyles.fontPoints}>{totalPoints} pontos</Text>
      </View>
      <LottieView
        autoPlay
        style={{
          width: 75,
          height: 60,
        }}
        source={badPlayer ? Bad : Winner}
      />
    </View>
  )

  return (
    <Modal
      transparent={true}
      animationType="slide"
      visible={visible}
      onRequestClose={onCancel}
      onShow={verifyWinner}
    >
      {!finishedMatch ?
        <Pressable style={[popupWinnerStyles.centeredView]} onPress={onCancel} >
          <TouchableWithoutFeedback>
            <View style={popupWinnerStyles.modalView}>
              <View style={popupWinnerStyles.vButtons}>
                <Text style={popupWinnerStyles.modalText}>{getMessage()}</Text>
                {players && players.map(player => {
                  let totalPoints = player.points.reduce((a, b) => (a + b), 0)
                  const playerWinner = winner.id !== player.id
                  return (
                    <DefaultButton
                      key={player.id}
                      disabled={playerWinner}
                      style={playerWinner ?
                        [popupWinnerStyles.button, popupWinnerStyles.badPlayerButton] :
                        [popupWinnerStyles.button]
                      }
                      text={`${player.name}`}
                      children={renderLottie(playerWinner, totalPoints, player)}
                      onPress={() => setFinishedMatch(true)}
                    />
                  )
                })}
                <DefaultButton
                  style={[popupWinnerStyles.button, popupWinnerStyles.cancelButton]}
                  text="Cancelar"
                  onPress={onCancel} />
              </View>
            </View>
          </TouchableWithoutFeedback>
        </Pressable>
        :
        <View style={{
          position: 'absolute', justifyContent: 'center',
          alignItems: 'center', backgroundColor: Colors.light.overlay, height: height
        }}>
          <LottieView
            source={WinnerMatch}
            autoPlay
            loop
            style={{ height: height * 0.5, width: width }}
            resizeMode='cover'
            duration={3500}
          />
          <View style={{ justifyContent: 'center', alignItems: 'center', gap: 20, }}>
            <Text style={{
              fontSize: 20,
              fontWeight: 'bold',
              color: 'white',
              textAlign: 'center'
            }}>
              Parabéns {winner.name}, grande vencedor(a).
            </Text>
            <DefaultButton
              style={[popupWinnerStyles.button]}
              text="Começar novamente"
              onPress={declareWinner} />
          </View>
        </View>
      }
    </Modal>
  );
};

export default PopupWinner;
