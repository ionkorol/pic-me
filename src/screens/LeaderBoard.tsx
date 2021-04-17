import { useNavigation } from "@react-navigation/core";
import React, { useEffect, useState } from "react";
import { View, Pressable, StyleSheet, Image, Text } from "react-native";
import { Layout } from "../components/common";
import { colors } from "../styles/variables";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";
import { RootState } from "../redux/store";
import { connect } from "react-redux";
import { UserProp } from "../utils/interfaces";
import { FlatList } from "react-native-gesture-handler";
import firebase from "../utils/firebase";
import { Avatar } from "../components/account";

interface Props {
  userData: UserProp;
}

const LeaderBoard: React.FC<Props> = (props) => {
  const { userData } = props;
  const nav = useNavigation();
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
      <View style={styles.header}>
        <Pressable
          style={styles.profileContainer}
          onPress={() => nav.navigate("Account")}
        >
          <Avatar />
          <Text style={styles.headline}>{userData.name}</Text>
        </Pressable>
        <MaterialIcons
          onPress={() => nav.navigate("Home")}
          name="home"
          size={30}
          color="#fff"
        />
      </View>
      <View>
        <Text style={styles.headline}>LeaderBoard</Text>
      </View>
      <FlatList
        style={styles.board}
        data={users}
        renderItem={(item) => (
          <View style={styles.boardItem}>
            <View>
              <Text style={styles.boardItemName}>{item.item.name}</Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <Ionicons name="star" size={20} color={colors.secondary} />
              <Text style={styles.boardItemPoints}>
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

const mapState = (state: RootState) => ({
  userData: state.user.data,
});

export default connect(mapState)(LeaderBoard);

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
  board: {
    flex: 1,
    backgroundColor: colors.gray,
  },
  boardItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    marginTop: 10,
    padding: 15,
  },
  boardItemName: {
    fontSize: 20,
    color: colors.primary,
  },
  boardItemPoints: {
    fontSize: 20,
    color: colors.secondary,
    fontWeight: "bold",
  },
  headline: {
    fontSize: 30,
    padding: 15,
    color: "#fff",
    fontWeight: "bold",
  },
});
