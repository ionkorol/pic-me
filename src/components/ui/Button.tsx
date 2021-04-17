import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { colors } from "../../styles/variables";

interface Props {
  color?: string;
  onPress?: () => any;
}
const Button: React.FC<Props> = (props) => {
  const { color, onPress } = props;
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{ ...styles.container, backgroundColor: color ? color : colors.secondary }}
    >
      <Text style={{ ...styles.text }}>{props.children}</Text>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    padding: 10,
    marginBottom: 10,
    marginTop: 10,
    borderRadius: 10,
  },
  text: {
    color: "#fff",
    fontSize: 30,
    fontWeight: "bold",
    textTransform: "uppercase",
  },
});
