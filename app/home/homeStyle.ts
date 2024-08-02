import { Colors } from "@/constants/Colors";
import { StyleSheet } from "react-native";

export default StyleSheet.create({

  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: "center",
    height: '100%',
    backgroundColor: Colors.light.background,
    padding:10
  },

  headerText: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '500',
    marginVertical: 15
  },

  vEmptyMatches: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: "center",
    marginTop: 30,
  },
  vInput: {
    marginBottom: 10
  },
  emptyText: {
    color: Colors.light.lightText,
  }
})