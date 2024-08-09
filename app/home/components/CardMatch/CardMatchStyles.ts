import { Colors } from "@/constants/Colors";
import { Dimensions, StyleSheet } from "react-native";

export const cardStyles = StyleSheet.create({

  container: {
    backgroundColor: Colors.light.white,
    borderRadius: 15,
    width: Dimensions.get('window').width * 0.95,
    padding: 10,
    borderColor: Colors.light.black,
    borderWidth: 1,
    marginTop: 15
  },
  title: {
    textAlign: 'center',
    fontSize: 15,
    fontWeight: 'bold',
    position: 'absolute',
    top: -5,
    left: Dimensions.get('screen').width * 0.4,
  },
  vPlayers: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  iconPlayer: {
    height: 20,
    width: 20
  },
  defalutText: {
    fontWeight: '400',
    fontSize: 12
  },
  vInfoWithPlayers: {
    gap: 5
  },
  vDate: {
    flexDirection: 'row',
    gap: 10,
  },
  item: {
    padding: 20,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
})