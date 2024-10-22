import { Colors } from "@/constants/Colors";
import { Dimensions, StyleSheet } from "react-native";


export const formMatchStyles = StyleSheet.create({
  container: {
    alignItems: "center",
    padding: 20,
    height: Dimensions.get('screen').height
  },

  header: {
    marginBottom: 25,
  },
  textHeader: {
    fontSize: 20
  },

  footer: {
    // flex: 1
    backgroundColor: 'red',
  },
  content: {

  },
  dropDown: {
    borderColor: 'transparent',
  },
  dropDownTextStyle: {
    color: Colors.light.lightText,
  },
  dropDownLabel: {
    padding: 5,
    fontSize: 12,
    fontWeight: 'bold'
  },
  inputMaxPoints: { width: Dimensions.get('window').width * 0.3 }
})