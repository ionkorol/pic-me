import React, { useState } from "react";
import {
  View,
  Image,
  StyleSheet,
  Text,
  Switch,
  TextInputProps,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import Layout from "../components/common/Layout";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/core";
import { connect } from "react-redux";
import { RootState } from "../redux/store";
import { UserProp } from "../utils/interfaces";
import { Button, Input, SexSelect } from "../components/ui";
import * as userActions from "../redux/actions/userActions";
import { colors } from "../styles/variables";
import { Header } from "../components/common";
import { classes } from "../styles";
import { getAvatarUrl } from "../lib";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

interface Props {
  data: UserProp;
  userLogOut: () => void;
  userSave: typeof userActions.save;
}

const Account: React.FC<Props> = (props) => {
  const { data, userLogOut, userSave } = props;

  const [name, setName] = useState(data.name);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [sex, setSex] = useState<"male" | "female">(data.sex);

  return (
    <Layout>
      <Header />
      <View
        style={{
          alignItems: "center",
          backgroundColor: colors.gray,
          paddingVertical: 10,
        }}
      >
        <Text style={{ ...classes.h1, color: colors.primary }}>My Profile</Text>
      </View>
      <KeyboardAwareScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{
          flex: 1,
          paddingHorizontal: 50,
          justifyContent: "center",
          marginTop: 20,
        }}
        extraScrollHeight={20}
        keyboardOpeningTime={0}
      >
        <Input value={name} onChangeText={setName} placeholder="NAME" />
        <SexSelect value={sex} setValue={setSex} />
        <Input
          value={oldPassword}
          onChangeText={setOldPassword}
          placeholder="CURRENT PASSWORD"
          secureTextEntry
        />
        <Input
          value={newPassword}
          onChangeText={setNewPassword}
          placeholder="NEW PASSWORD"
          secureTextEntry
        />
        <Button color={colors.success} onPress={() => userSave(name, sex)}>
          Save
        </Button>
        <Button color={colors.error} onPress={userLogOut}>
          Log Out
        </Button>
      </KeyboardAwareScrollView>
    </Layout>
  );
};

const mapState = (state: RootState) => ({
  data: state.user.data!,
});

const mapDispatch = {
  userLogOut: userActions.logOut,
  userSave: userActions.save as any,
};

export default connect(mapState, mapDispatch)(Account);

const styles = StyleSheet.create({});
