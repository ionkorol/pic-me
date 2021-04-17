import React from "react";
import { TextInput, StyleSheet } from "react-native";
import { colors } from "../../styles/variables";

interface Props {
  value: string;
  onChangeText: any;
  placeholder: string;
}

const Input: React.FC<Props> = (props) => {
  const { value, onChangeText, placeholder } = props;

  return (
    <TextInput
      style={styles.container}
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      placeholderTextColor={colors.gray}
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
