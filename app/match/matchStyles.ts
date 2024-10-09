import { Colors } from "@/constants/Colors";
import { StyleSheet, Dimensions } from "react-native";


export default StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: Colors.light.white,
    flexDirection: 'column'
  },
  topListContainer: {
    flex: 2,
    borderColor: 'black',
    borderWidth: 1,
    margin: 10,
  },
  bottomListContainer: {
    flex: 1,
    borderColor: 'black',
    borderWidth: 1,
    margin: 10,
    paddingHorizontal: 0,
  },
});
