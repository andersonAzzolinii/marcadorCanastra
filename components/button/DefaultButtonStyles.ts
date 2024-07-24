import { Colors } from "@/constants/Colors";
import { StyleSheet } from "react-native";


export const defaultButtonStyles = StyleSheet.create({

  button: {
    height: 60,
    backgroundColor: Colors.light.success,
    borderRadius: 15,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    fontSize: 20,
    color: Colors.light.white
  }
})