import { Colors } from "@/constants/Colors";
import { Dimensions, StyleSheet } from "react-native";

export default StyleSheet.create({

  container: {
    padding: 10,
    height: '100%'
  },

  headerText: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '500',
    marginVertical: 15
  },

  vEmptyMatches: {
    flex: 1,
    width: Dimensions.get('screen').width,
    justifyContent: 'center',
    alignItems: "center",
    marginTop: 30,
  },
  vInput: {
    width: '100%'
  },
  emptyText: {
    color: Colors.light.lightText,
    fontSize: 22
  },

})