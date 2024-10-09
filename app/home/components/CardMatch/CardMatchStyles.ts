import { Colors } from "@/constants/Colors";
import { Dimensions, StyleSheet } from "react-native";

export const cardStyles = StyleSheet.create({

  container: {
    backgroundColor: Colors.light.white,
    borderRadius: 5,
    width: Dimensions.get('window').width * 0.95,
    padding: 5,
    borderColor: Colors.light.black,
    borderWidth: 1,
    minHeight: 100,
    marginTop: 10,
  },
  swipeableContainer: {
    backgroundColor: 'transparent'
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign:'center'
  },
  vPlayers: {
    overflow: 'hidden',
    flexWrap:'nowrap',
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
    fontSize: 15
  },
  vInfoWithPlayers: {
    flex: 0.5,
    height: 70,
    gap: 5,
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
  },
  vDate: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  item: {
    padding: 20,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
})