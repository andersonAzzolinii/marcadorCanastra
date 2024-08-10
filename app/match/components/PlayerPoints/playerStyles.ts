import { Colors } from "@/constants/Colors";
import { Dimensions, StyleSheet } from "react-native";

const { width, height } = Dimensions.get('window');

export const playerPointStyles = StyleSheet.create({
  vPointPlayers: {
    width: width / 2,
    padding: 10,
  },
  vTextPoints: {
    alignItems: 'center',
    flexDirection: 'column',
    gap: 10,
  },
  vDivisor: {
    height: 2,
    backgroundColor: Colors.light.black,
    width: 65,
  },
  textNamePlayers: {
    textAlign: "center",
    marginBottom: 10
  }
})