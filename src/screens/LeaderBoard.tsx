import React, { useEffect, useState } from "react";
import { View, StyleSheet, Image, Text } from "react-native";
import { Header, Layout } from "components/common";
import { colors } from "style/variables";
import { Ionicons } from "@expo/vector-icons";

import { UserProp } from "utils/interfaces";
import { FlatList } from "react-native-gesture-handler";
import firebase from "utils/firebase";
import { Avatar } from "components/account";
import { classes } from "style";

interface Props {}

const LeaderBoard: React.FC<Props> = (props) => {
  const [users, setUsers] = useState<UserProp[]>([]);

  useEffect(() => {
    (async () => {
      const userQ = await firebase
        .firestore()
        .collection("users")
        .orderBy("totalPoints", "desc")
        .get();
      const usersData = userQ.docs.map((doc) => doc.data() as UserProp);
      setUsers(usersData);
    })();
  }, []);

  return (
    <Layout>
      <Header />
      <View style={{ padding: 10, alignItems: "center" }}>
        <Text style={classes.h1}>Leader Board</Text>
      </View>
      <FlatList
        style={styles.board}
        data={users}
        renderItem={(item) => (
          <View style={styles.boardItem}>
            <View style={{ flexDirection: "row" }}>
              <Avatar sex={item.item.sex} size={30} />
              <Text style={styles.boardItemName}>{item.item.name}</Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <Ionicons name="star" size={20} color={colors.secondary} />
              <Text style={{ ...styles.boardItemPoints, ...classes.ml }}>
                {item.item.totalPoints}
              </Text>
            </View>
          </View>
        )}
        keyExtractor={(item) => item.id}
      />
    </Layout>
  );
};

export default LeaderBoard;

const styles = StyleSheet.create({
  board: {
    flex: 1,
    backgroundColor: colors.gray,
  },
  boardItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    marginTop: 10,
    marginHorizontal: 15,
    padding: 15,
    borderRadius: 10,
  },
  boardItemName: {
    fontSize: 20,
    color: colors.primary,
    fontWeight: "bold",
  },
  boardItemPoints: {
    fontSize: 20,
    color: colors.secondary,
    fontWeight: "bold",
  },
});
