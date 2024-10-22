import { Dimensions, StyleSheet } from "react-native";

const { width, height } = Dimensions.get('screen');

export const playerInputStyles = StyleSheet.create({
  vInputPointPlayers: {
    width: width - 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 15
  },
  vTextPoints: {
    alignItems: 'center',
    flexDirection: 'column',
    gap: 10,
  },
  inputText: {
    height: 40,
    width: 100,
    fontSize: 15,
    textAlign: 'center',
    borderColor: 'black',
  },
  button: {
    height: 40,
    width: 200,
    fontSize: 15,
  },

  playerName: {
    fontWeight: 'bold',
    fontSize: 20
  }

})