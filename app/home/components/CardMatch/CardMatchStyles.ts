import { Colors } from "@/constants/Colors";
import { Dimensions, StyleSheet } from "react-native";

export const cardStyles = StyleSheet.create({

  container: {
    marginBottom: 10,
    minHeight: 125,
    gap: 15,
    width: Dimensions.get('window').width * 0.95,
    backgroundColor: 'white',
    padding: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.55,
    shadowRadius: 4,

    elevation: 5,
  },

  title: {
    fontSize: 22,
    fontWeight: 'bold',

  },
  vPlayers: {
    overflow: 'hidden',
    flexWrap: 'nowrap',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  iconPlayer: {
    height: 20,
    width: 20,
  },
  defalutText: {
    fontWeight: '400',
    fontSize: 18,
    verticalAlign: 'bottom',
    color: Colors.light.lightText
  },
  vInfoWithPlayers: {
    flexDirection: "row",
    alignItems: 'center',
    gap: 5
  },
  vDate: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  item: {
    padding: 20,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
})