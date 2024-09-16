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
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15
  },
  imageUser: {
    height: 25,
    width: 25
  },
  textWinner: {
    color: Colors.light.success
  },
  textLoser: {
    color: Colors.light.danger
  },
})