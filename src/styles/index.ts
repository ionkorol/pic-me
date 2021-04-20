import { StyleSheet } from "react-native";
import { colors } from "./variables";
export const classes = StyleSheet.create({
  h1: {
    fontSize: 30,
    fontWeight: "bold",
    letterSpacing: 2,
    color: colors.gray,
  },
  text: {
    fontSize: 20,
    color: colors.gray,
  },
  bold: {
    fontWeight: "bold",
  },
  ml: {
    marginLeft: 5,
  },
});
