import DefaultButton from '@/components/button';
import React, { useEffect, useState } from 'react';
import { View, Text, Modal, Pressable, TouchableWithoutFeedback } from 'react-native';
import { popupWinnerStyles } from './popupWinnerStyles';
import { Player } from '@/types/player';
import LottieView from 'lottie-react-native';
import Bad from '@/lotties/bad.json'
import Winner from '@/lotties/winner.json'
import { messagesWinner } from '@/util/WinnerMessages';

interface PopupWinnerProps {
  visible: boolean;
  onHidden?: () => void;
  onCancel: () => void;
  players: Player[] | undefined;
  maxPoints: number
}


const PopupWinner: React.FC<PopupWinnerProps> = ({ visible, onCancel, players, maxPoints }) => {

  const [winner, setWinner] = useState<Partial<Player>>({})

  useEffect(() => {
    verifyWinner()

    return () => {
      setWinner({})
    }
  }, [])

  const verifyWinner = () => {
    let points = 0
    let winner = {}
    players?.map(player => winner = player.points.reduce((a, b) => (a + b), 0) > points ?
      player : winner)

    setWinner(winner)
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

  const getMessage = () => messagesWinner[Math.floor(Math.random() * messagesWinner.length)]

  const declareWinner = async () => {

  }

  return (
    <Modal
      transparent={true}
      animationType="slide"
      visible={visible}
      onRequestClose={onCancel}
    >
      <Pressable style={popupWinnerStyles.centeredView} onPress={onCancel} >
        <TouchableWithoutFeedback>
          <View style={popupWinnerStyles.modalView}>
            <View style={popupWinnerStyles.vButtons}>
              <Text style={popupWinnerStyles.modalText}>{getMessage()}</Text>
              {players && players.map(player => {
                let totalPoints = player.points.reduce((a, b) => (a + b), 0)
                return (
                  <DefaultButton
                    key={player.id}
                    disabled={winner.id !== player.id}
                    style={winner.id !== player.id ?
                      [popupWinnerStyles.button, popupWinnerStyles.badPlayerButton] :
                      [popupWinnerStyles.button]
                    }
                    text={`${player.name}`}
                    children={renderLottie(winner.id !== player.id, totalPoints, player)}
                    onPress={declareWinner}
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
    </Modal>
  );
};

export default PopupWinner;
