import { Dimensions, StyleSheet } from "react-native";

const { width, height } = Dimensions.get('window');

export const playerInputStyles = StyleSheet.create({
  vInputPointPlayers: {
    width: width,
    justifyContent: 'center',
    alignItems: 'center',
  },
  vTextPoints: {
    alignItems: 'center',
    flexDirection: 'column',
    gap: 10,
  },
  inputText: {
    height: 50,
    width: 125,
    fontSize: 20,
    textAlign: 'center',
    borderColor: 'black',
  },
  button: {
    height: 45,
    width: 225,
  },
  vArrows: {
    position: 'absolute',
    top: '45%',
    zIndex: 10
  },
  vArrowRight: {
    right: 5
  },
  bottomListContent: {
    paddingHorizontal: 0,
  },

})