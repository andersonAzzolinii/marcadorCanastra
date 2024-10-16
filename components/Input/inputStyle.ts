import { Colors } from "@/constants/Colors";
import { Dimensions, StyleSheet } from "react-native";

export const inputStyles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: 'transparent',
    backgroundColor: Colors.light.white,
    borderRadius: 5,
    height: 50,
    paddingLeft: 5,
    width: Dimensions.get('screen').width - 20
  },
  inputError: {
    borderColor: Colors.light.danger
  },
  label: {
    padding: 5,
    fontSize: 12,
    fontWeight: 'bold'
  }

})