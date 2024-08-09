import { Colors } from "@/constants/Colors";
import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get('window');

export default StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: Colors.light.white,
  },
  matchName: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 20,
    fontWeight: 'bold',
  },
  topListContainer: {
    flex: 2, 
    borderColor: 'black',
    borderWidth: 1,
    margin: 10,
  },
  bottomListContainer: {
    flex: 1,
    borderColor: 'black',
    borderWidth: 1,
    margin: 10,
    paddingHorizontal: 0,
  },
  bottomListContent: {
    paddingHorizontal: 0,
  },
  vPointPlayers: {
    width: width / 2,
    padding: 10,
    alignItems: 'center',
  },
  vTextPoints: {
    alignItems: 'center',
    flexDirection: 'column',
    gap: 10,
  },
  vDivisor: {
    height: 2,
    backgroundColor: Colors.light.black,
    width: 65,
  },
  vInputPointPlayers: {
    width: width,
    justifyContent: 'center',
    alignItems: 'center',
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
    zIndex:10
  },
  vArrowRight: {
    right: 5
  },

});
