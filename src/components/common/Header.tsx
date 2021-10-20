import React from "react";
import { Pressable, View, Text, StyleSheet } from "react-native";
import { Avatar } from "components/account";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { colors } from "style/variables";
import { useNavigation, useRoute } from "@react-navigation/core";

import { classes } from "style";
import { useAppSelector } from "store/store";
import { HStack } from "native-base";

interface Props {}

const Header: React.FC<Props> = (props) => {
  const { user } = useAppSelector((state) => state.user);

  const nav = useNavigation();
  const route = useRoute();

  return (
    <HStack>
      <Pressable
        style={styles.profileContainer}
        onPress={() => nav.navigate("Account")}
      >
        <Avatar />
        <View style={styles.profileInfo}>
          <Text style={classes.h1}>{user?.name}</Text>
          <View style={{ flexDirection: "row" }}>
            <Ionicons name="star" size={20} color={colors.gray} />
            <Text style={{ ...classes.text, ...classes.bold, ...classes.ml }}>
              {user?.totalPoints}
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
    </HStack>
  );
};

export default Header;

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
