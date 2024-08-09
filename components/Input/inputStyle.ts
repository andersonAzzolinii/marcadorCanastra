import { Colors } from "@/constants/Colors";
import { Dimensions, StyleSheet } from "react-native";

export const inputStyles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: 'transparent',
    backgroundColor: Colors.light.white,
    borderRadius: 5,
    width:'100%',
    height: 50,
    paddingLeft: 5,
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