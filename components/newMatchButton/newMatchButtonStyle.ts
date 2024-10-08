import { Colors } from "@/constants/Colors";
import { StyleSheet } from "react-native";

export const NewMatchButtonStyles = StyleSheet.create({
  vLink: {
    position: 'absolute',
    right: 25,
    height: 80,
    width: 80,
    backgroundColor: Colors.light.success,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    bottom: 30
  },
  text: {
    fontSize: 50,
    fontWeight: "bold",
    color: Colors.light.white
  }
})
