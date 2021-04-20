import React from "react";
import { Pressable, View, Text, StyleSheet } from "react-native";
import { Avatar } from "../account";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { colors } from "../../styles/variables";
import { useNavigation, useRoute } from "@react-navigation/core";
import { RootState } from "../../redux/store";
import { connect } from "react-redux";
import { UserProp } from "src/utils/interfaces";
import { classes } from "../../styles/";

interface Props {
  data: UserProp;
}

const Header: React.FC<Props> = (props) => {
  const { data } = props;

  const nav = useNavigation();
  const route = useRoute();

  return (
    <View style={styles.header}>
      <Pressable
        style={styles.profileContainer}
        onPress={() => nav.navigate("Account")}
      >
        <Avatar />
        <View style={styles.profileInfo}>
          <Text style={classes.h1}>{data.name}</Text>
          <View style={{ flexDirection: "row" }}>
            <Ionicons name="star" size={20} color={colors.gray} />
            <Text style={{ ...classes.text, ...classes.bold, ...classes.ml }}>
              {data.totalPoints}
            </Text>
          </View>
        </View>
      </Pressable>
      {route.name === "Home" ? (
        <MaterialIcons
          onPress={() => nav.navigate("LeaderBoard")}
          name="leaderboard"
          size={30}
          color={colors.gray}
        />
      ) : (
        <MaterialIcons
          name="home"
          size={30}
          color={colors.gray}
          onPress={() => nav.navigate("Home")}
        />
      )}
    </View>
  );
};

const mapState = (state: RootState) => ({
  data: state.user.data!,
});

export default connect(mapState)(Header);

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
});
