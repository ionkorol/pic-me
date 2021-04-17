import React from "react";
import { View, Image, StyleSheet, Text } from "react-native";
import Layout from "../components/common/Layout";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/core";
import { connect } from "react-redux";
import { RootState } from "../redux/store";
import { UserProp } from "../utils/interfaces";
import { Button } from "../components/ui";
import * as userActions from "../redux/actions/userActions";
import { Avatar } from "../components/account";
import { colors } from "../styles/variables";

interface Props {
  data: UserProp;
  userLogOut: () => void;
}

const Account: React.FC<Props> = (props) => {
  const { data, userLogOut } = props;

  const nav = useNavigation();
  return (
    <Layout>
      <View style={styles.iconContainer}>
        <Ionicons
          onPress={() => nav.navigate("Home")}
          name="grid"
          size={30}
          color="white"
        />
        <Ionicons name="share-social" size={30} color="white" />
      </View>
      <View style={styles.profileContainer}>
        <Avatar size={100} />
        <Text style={styles.name}>{data && data.name}</Text>
      </View>
      <View style={{ flex: 1, padding: 15, justifyContent: "flex-end" }}>
        <Button onPress={userLogOut}>Log Out</Button>
      </View>
    </Layout>
  );
};

const mapState = (state: RootState) => ({
  data: state.user.data,
});

const mapDispatch = {
  userLogOut: userActions.logOut,
};

export default connect(mapState, mapDispatch)(Account);

const styles = StyleSheet.create({
  iconContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 15,
  },
  profileContainer: {
    backgroundColor: colors.secondary,
    paddingVertical: 15,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  catsContainer: {
    flex: 1,
    flexDirection: "column",
    paddingVertical: 20,
  },
  name: {
    fontSize: 30,
    color: "#fff",
    fontWeight: "bold",
  },

  cat: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 50,
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  catName: {
    fontSize: 20,
    color: "#fff",
    fontWeight: "bold",
    marginLeft: 10,
  },
  catScoreContainer: {
    backgroundColor: "#fff",
    marginLeft: 10,
    padding: 5,
    borderRadius: 10,
  },
  catScore: {
    fontSize: 20,
    color: "green",
    fontWeight: "bold",
  },
});
