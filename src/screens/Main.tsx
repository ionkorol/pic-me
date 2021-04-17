import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Image, Pressable } from "react-native";
import Layout from "../components/common/Layout";
import { connect } from "react-redux";
import * as categoriesActions from "../redux/actions/categoriesActions";
import { useNavigation } from "@react-navigation/core";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { Card } from "../components/ui";
import { RootState } from "../redux/store";
import { CategoryProp, UserProp } from "../utils/interfaces";

import { colors } from "../styles/variables";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { Avatar } from "../components/account";

interface Props {
  categoriesGet: () => any;
  userLoading: boolean;
  userData: UserProp;
  userError: any;
  categoriesLoading: boolean;
  categoriesData: CategoryProp[];
  categoriesError: any;
}

const Main: React.FC<Props> = (props) => {
  const { userData, categoriesData, categoriesGet } = props;
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

  useEffect(() => {
    categoriesGet();
  }, [userData]);

  return (
    <Layout>
      <View style={styles.header}>
        <Pressable
          style={styles.profileContainer}
          onPress={() => nav.navigate("Account")}
        >
          <Avatar />
          <View style={styles.profileInfo}>
            <Text style={styles.headline}>{userData.name}</Text>
            <View style={{ flexDirection: "row" }}>
              <Ionicons name="star" size={20} color="#fff" />
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "bold",
                  color: "#fff",
                  marginLeft: 5,
                }}
              >
                {userData.totalPoints}
              </Text>
            </View>
          </View>
        </Pressable>
        <MaterialIcons
          onPress={() => nav.navigate("LeaderBoard")}
          name="leaderboard"
          size={30}
          color="#fff"
        />
      </View>
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

const mapState = (state: RootState) => ({
  userLoading: state.user.loading,
  userData: state.user.data,
  userError: state.user.error,
  categoriesLoading: state.categories.loading,
  categoriesData: state.categories.data,
  categoriesError: state.categories.error,
});

const mapDispatch = {
  categoriesGet: categoriesActions.categoriesGet,
};

export default connect(mapState, mapDispatch)(Main);

const styles = StyleSheet.create({
  header: {
    backgroundColor: colors.secondary,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
  },
  profileContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  profileInfo: {},

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
