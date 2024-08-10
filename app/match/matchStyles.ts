import { Colors } from "@/constants/Colors";
import { StyleSheet, Dimensions } from "react-native";


export default StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: Colors.light.white,
  },
  matchName: {
    textAlign: 'left',
    marginTop: 20,
    paddingLeft: 10,
    fontSize: 20,
    fontWeight: 'bold',
  },
  maxPointsText: {
    fontSize: 12,
    paddingLeft: 10,
    fontWeight: '400',
    fontStyle: 'italic'
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
