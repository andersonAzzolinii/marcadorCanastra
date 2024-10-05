import { Colors } from "@/constants/Colors";
import { StyleSheet } from "react-native";

export const historyStyle = StyleSheet.create({
  containerHistories: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  contentContainer: {
    flex: 1,
    backgroundColor: 'white',
    marginTop: '20%',
    width: '100%',
    borderTopStartRadius: 30,
    borderTopEndRadius: 30
  },
  vHeader: {
    flexDirection: 'row',
    marginBottom: 40,
    width: '100%',
    alignItems: 'baseline',
    justifyContent: 'center'
  },
  textTitle: {
    fontSize: 25,
    textAlign: 'center',
    verticalAlign: 'bottom',
    marginTop: 10,
    flex: 0.85
  },
  vDateHistory: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 25,
    marginBottom: 10
  },
  textDate: {
    fontSize: 15,
    verticalAlign: 'middle'
  },
  vPlayers: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 50,
  },
  vPoints: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  vTexPoints: {
    flex: 0.2,
  },
  imageUser: {
    height: 35,
    width: 45
  },
  textPlayer: {
    marginLeft: 15,
    fontSize: 15
  },
  textPoints: {
    flex: 0.2
  },
  textWinner: {
    color: Colors.light.success
  },
  textLoser: {
    color: Colors.light.danger
  },
})