import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { colors } from "style/variables";

const Logo = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.first}>Pic</Text>
      <Text style={styles.second}>Me</Text>
    </View>
  );
};

export default Logo;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
  },
  first: {
    fontSize: 50,
    fontWeight: "bold",
    color: colors.gray,
    letterSpacing: 5,
  },
  second: {
    fontSize: 50,
    fontWeight: "bold",
    color: colors.secondary,
    letterSpacing: 5,
  },
});
