import { Colors } from "@/constants/Colors";
import { StyleSheet } from "react-native";

export const PopupExclusionStyles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 20,
  },
  vRowButtons: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 15
  },
  button: {
    padding: 15,
  },
  cancelButton: {
    backgroundColor: Colors.light.danger
  }
});

