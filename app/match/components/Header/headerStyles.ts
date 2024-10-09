import { StyleSheet } from "react-native";

export default StyleSheet.create({

  container: {
    flexDirection: "row",
    justifyContent: 'space-between',
    alignItems: 'flex-end',
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
  containerListOptions: {
    position: 'absolute',
    right: 20,
    top: 55,
    justifyContent: 'space-between',
    borderColor: 'black',
    zIndex: 200,
    minWidth: 150,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  textOption: {
    height: 40,
    textAlign: 'center',
    borderWidth: 1,
    textAlignVertical: 'center'
  },
  imageOptions: {
    width: 50,
    height: 50
  },
  overlay: {
    top: '100%',
    backgroundColor: 'red', // fundo transparente
  },

})