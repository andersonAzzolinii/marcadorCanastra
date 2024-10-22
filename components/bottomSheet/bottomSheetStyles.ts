import { StyleSheet } from "react-native";

export const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
  },
  overlay: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Fundo escuro com opacidade
  },
  contentContainer: {
    backgroundColor: "#fff", // Cor da BottomSheet
    width: "100%",
    borderTopStartRadius: 20,
    borderTopEndRadius: 20,
    padding: 16,
    position: "absolute",
    bottom: 0,
  },
  containerItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  icon: {
    width: 40,
    height: 60,
  },
  textOption: {
    textAlign: "center",
    flex: 1,
    fontWeight: "500",
    fontSize: 15,
  },
});
