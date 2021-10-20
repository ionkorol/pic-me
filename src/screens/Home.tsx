import React, { useEffect, useState, useCallback } from "react";
import { StyleSheet, View, Image, Pressable } from "react-native";
import Layout from "components/common/Layout";
import { useFocusEffect, useNavigation } from "@react-navigation/core";
import { Ionicons } from "@expo/vector-icons";
import { Card } from "components/ui";
import { useAppDispatch, useAppSelector } from "store/store";
import { CategoryProp } from "utils/interfaces";

import { colors } from "style/variables";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { Header } from "components/common";
import { getCategories } from "store/slices/categoriesSlice";

interface Props {}

const Main: React.FC<Props> = (props) => {
  const userData = useAppSelector((state) => state.user.user!);
  const categoriesData = useAppSelector((state) => state.categories.categories);
  const dispatch = useAppDispatch();

  const [categories, setCategories] = useState<CategoryProp[]>([]);
  const [activeFilter, setActiveFilter] = useState<
    "grid" | "favorite" | "time"
  >("grid");

  const nav = useNavigation();

  useEffect(() => {
    const data = categoriesData.map((item) => {
      const availableCategories = Object.keys(userData.categories);
      if (availableCategories.includes(item.name.toLowerCase())) {
        return {
          ...item,
          points: userData.categories[item.name.toLowerCase()].points,
        };
      } else {
        return {
          ...item,
          points: 0,
        };
      }
    }) as CategoryProp[];
    setCategories(data.sort((a, b) => b.points! - a.points!));
  }, [userData, categoriesData]);

  useFocusEffect(
    useCallback(() => {
      dispatch(getCategories());
    }, [userData])
  );

  return (
    <Layout>
      <Header />
      <View style={styles.filters}>
        <TouchableOpacity
          onPress={() => setActiveFilter("grid")}
          style={{
            ...styles.filter,
            borderBottomColor:
              activeFilter === "grid" ? colors.secondary : "#00000000",
          }}
        >
          <Ionicons name="grid" size={30} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setActiveFilter("favorite")}
          style={{
            ...styles.filter,
            borderBottomColor:
              activeFilter === "favorite" ? colors.secondary : "#00000000",
          }}
        >
          <Ionicons name="heart" size={30} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setActiveFilter("time")}
          style={{
            ...styles.filter,
            borderBottomColor:
              activeFilter === "time" ? colors.secondary : "#00000000",
          }}
        >
          <Ionicons name="time" size={30} color="#fff" />
        </TouchableOpacity>
      </View>
      <ScrollView contentContainerStyle={styles.catsContainer}>
        {categories.map((categorie) => (
          <Card data={categorie} key={categorie.name} />
        ))}
      </ScrollView>
    </Layout>
  );
};

export default Main;

const styles = StyleSheet.create({
  filters: {
    height: 60,
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: colors.primary,
  },
  filter: {
    flex: 1,
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
    borderBottomWidth: 5,
  },
  catsContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    flexWrap: "wrap",
    paddingVertical: 15,
    backgroundColor: colors.gray,
  },
  headline: {
    fontSize: 20,
    color: "#fff",
    fontWeight: "bold",
  },
});
