import { Colors } from "@/constants/Colors";
import { Dimensions, StyleSheet } from "react-native";


export const popupWinnerStyles = StyleSheet.create({

  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.light.overlay,
  },
  modalView: {
    alignItems: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 20,
    paddingHorizontal: 10,
    color: Colors.light.white
  },
  vButtons: {
    flex: 1,
    gap: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    width: Dimensions.get('window').width * 0.9,
  },
  cancelButton: {
    backgroundColor: Colors.light.danger
  },
  badPlayerButton: {
    backgroundColor: Colors.light.disabled,
    color: Colors.light.black
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '100%'
  },
  fontName: {
    fontSize: 17
  },
  fontPoints: {
    fontSize: 12,
    fontStyle: 'italic'
  }

})