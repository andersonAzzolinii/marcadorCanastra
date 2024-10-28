import { Colors } from "@/constants/Colors";
import { Dimensions, StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    alignItems: 'center'
  },
  animatedNotification: {
    padding: 15,
    backgroundColor: Colors.light.white,
    height: 75,
    width: Dimensions.get('screen').width * 0.95,
    borderRadius: 20,
    borderWidth: 3,
    alignItems: 'center',
    flexDirection: 'row'
  },
  messageText: {
    color: Colors.light.black,
    textAlign: "center",
    fontSize: 15,
    fontWeight: 'bold'
  },
  lottie: {
    width: 60,
    height: 60,
  },
  errorBorder: {
    borderColor: Colors.light.danger
  },
  sucessBorder: {
    borderColor: Colors.light.success
  }
});