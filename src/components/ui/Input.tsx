import React from "react";
import { TextInput, StyleSheet, TextInputProps } from "react-native";
import { colors } from "../../styles/variables";

interface Props extends TextInputProps {}

const Input: React.FC<Props> = (props) => {
  return (
    <TextInput
      {...props}
      style={styles.container}
      placeholderTextColor={colors.gray}
      keyboardAppearance="dark"
    />
  );
};

export default Input;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    padding: 10,
    fontSize: 30,
    marginBottom: 30,
    color: colors.primary,
    textAlign: "center",
    borderRadius: 10,
  },
});
