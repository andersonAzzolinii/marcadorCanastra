import { Colors } from "@/constants/Colors";
import { Dimensions, StyleSheet } from "react-native";

export default StyleSheet.create({

  container: {
    justifyContent: 'center',
    alignItems: "center",
    height: '100%',
    backgroundColor: Colors.light.background,
    padding: 10
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
    marginBottom: 10,
    flex: 1
  },
  emptyText: {
    color: Colors.light.lightText,
  },

})