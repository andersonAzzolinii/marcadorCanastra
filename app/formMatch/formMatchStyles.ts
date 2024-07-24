import { Colors } from "@/constants/Colors";
import { Dimensions, StyleSheet } from "react-native";


export const formMatchStyles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: "center",
    height: '100%',
    padding: 20,
    backgroundColor: Colors.light.background
  },

  header: {
    display: 'flex',
    marginBottom: 25,
  },
  textHeader: {
    fontSize: 20
  },
  content: {
    display: 'flex',
    flex: 1,
  },
  footer: {
    display: 'flex',
    justifyContent: 'flex-end',
    flex: 0.9
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