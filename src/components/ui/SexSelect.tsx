import React, { Dispatch, useState } from "react";
import { View, Image, StyleSheet, Pressable } from "react-native";
import { getAvatarUrl } from "../../lib";
import { colors } from "../../styles/variables";

interface Props {
  value: "male" | "female";
  setValue: Dispatch<"male" | "female">;
}

const SexSelect: React.FC<Props> = (props) => {
  const { value, setValue } = props;

  return (
    <View style={styles.container}>
      <Pressable onPress={() => setValue("male")}>
        <View
          style={{
            ...styles.sexContainer,
            backgroundColor: value === "male" ? colors.secondary : colors.gray,
          }}
        >
          <Image
            source={{ uri: getAvatarUrl("male") }}
            style={styles.sexImage}
          />
        </View>
      </Pressable>
      <Pressable onPress={() => setValue("female")}>
        <View
          style={{
            ...styles.sexContainer,
            backgroundColor:
              value === "female" ? colors.secondary : colors.gray,
          }}
        >
          <Image
            source={{ uri: getAvatarUrl("female") }}
            style={styles.sexImage}
          />
        </View>
      </Pressable>
    </View>
  );
};

export default SexSelect;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 30,
  },
  sexContainer: {
    backgroundColor: colors.gray,
    borderRadius: 10,
    padding: 10,
  },
  sexImage: {
    width: 50,
    height: 50,
  },
  selected: {
    backgroundColor: colors.secondary,
  },
});
