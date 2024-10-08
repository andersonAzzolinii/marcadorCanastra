import { Colors } from "@/constants/Colors";
import { Dimensions, StyleSheet } from "react-native";


export const style = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: Colors.light.overlay,
  },
  contentContainer: {
    backgroundColor: Colors.light.disabled,
    width: '100%',
    borderTopStartRadius: 20,
    borderTopEndRadius: 20,
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
    width: 40,
    height: 60,
  },
  textOption: {
    textAlign: 'center',
    flex: 1,
    fontWeight: '500',
    fontSize: 15
  }
})