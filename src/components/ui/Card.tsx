import React, { useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/core";
import { connect } from "react-redux";
import { CategoryProp } from "utils/interfaces";
import { useAppDispatch, useAppSelector } from "store/store";
import { setCategory } from "store/slices/categoriesSlice";

interface Props {
  data: CategoryProp;
}

const Card: React.FC<Props> = (props) => {
  const { data } = props;
  const nav = useNavigation();
  const dispatch = useAppDispatch();

  const handlePress = () => {
    dispatch(setCategory(data.name));
    nav.navigate("Camera");
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      style={{ ...styles.container, backgroundColor: data.color }}
    >
      <Ionicons
        name="heart-outline"
        size={30}
        color="#fff"
        style={styles.favorite}
      />
      <View style={styles.badge}>
        <Text>{data.points}</Text>
      </View>
      <Image
        source={{
          uri: `https://firebasestorage.googleapis.com/v0/b/picpic-310022.appspot.com/o/icons%2Fcategories%2F${data.icon}.png?alt=media`,
        }}
        width={100}
        height={100}
        style={{ width: 100, height: 100, resizeMode: "stretch" }}
      />
      <Text
        numberOfLines={1}
        adjustsFontSizeToFit
        minimumFontScale={0.1}
        style={styles.headline}
      >
        {data.name}
      </Text>
    </TouchableOpacity>
  );
};

export default Card;

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "green",
    width: "45%",
    borderRadius: 10,
    padding: 30,
    marginBottom: 20,
  },
  headline: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 20,
    marginTop: 5,
  },
  badge: {
    position: "absolute",
    top: 10,
    left: 10,
    backgroundColor: "#fff",
    borderRadius: 5,
    padding: 5,
  },
  favorite: {
    position: "absolute",
    top: 10,
    right: 10,
  },
});
