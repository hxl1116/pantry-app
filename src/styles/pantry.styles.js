import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  pantryWrapper: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
  },
  emptyPantryCaption: {
    width: "auto",
    height: "auto",
    fontSize: 20,
  },
  addItemModalContainer: {
    width: "90%",
    padding: 20,
    alignSelf: "center",
    backgroundColor: "white",
  },
  addItemFormContainer: {
    justifyContent: "space-around",
  },
  addItemFormInput: {
    marginBottom: 10,
  },
  addItemFormAmtGroup: {
    marginVertical: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  addItemButtonGroup: {
    flexDirection: "row",
    alignItems: "center",
  },
  cancelItemButton: {
    flex: 1,
  },
  addItemButton: {
    flex: 1,
  },
  itemAmtCaption: {
    fontSize: 18,
  },
  separator: {
    marginTop: 15,
    marginBottom: 5
  }
});

export default styles;
