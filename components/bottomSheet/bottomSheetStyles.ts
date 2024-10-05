import { Dimensions, StyleSheet } from "react-native";


export const style = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  contentContainer: {
    minHeight: 200,
    backgroundColor: 'white',
    width: '100%',
    borderTopStartRadius: 30,
    borderTopEndRadius: 30,
    padding: 16, 
    position: 'absolute', 
    bottom: 0,

  },

  containerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  icon: {
    width: 25,
    height: 60,
  },
  textOption: {
    textAlign: 'center',
    flex: 1,
    fontWeight: '500',
    fontSize: 15
  }
})