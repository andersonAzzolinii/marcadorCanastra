import { Colors } from "@/constants/Colors";
import { Dimensions, StyleSheet } from "react-native";

export const cardStyles = StyleSheet.create({

  container: {
    marginBottom: 10,
    minHeight: 130,
    marginTop: 10,
    backgroundColor: Colors.light.white,
    borderRadius: 20,
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.55,
    shadowRadius: 5,
    elevation: 5
  },
  touchable: {
    backgroundColor: 'transparent',
    flex: 1
  },
  vTitle: {
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    backgroundColor: 'black'
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: Colors.light.white

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
    fontWeight: '200',
    fontSize: 18,
    verticalAlign: 'bottom',
  },
  vInfoWithPlayers: {
    padding: 5,
    marginLeft: 10,
    flexDirection: "row",
    alignItems: 'center',
    flex: 1,
    gap: 10
  },
  vDate: {
    padding: 5,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginLeft: 10,
  },
  item: {
    padding: 20,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
})