import React, { useState } from "react";
import { View, Text } from "react-native";
import Layout from "components/common/Layout";

import { useAppDispatch, useAppSelector } from "store/store";
import { Button, Input, SexSelect } from "components/ui";
import { colors } from "style/variables";
import { Header } from "components/common";
import { classes } from "style";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { signoutUser } from "store/slices/userSlice";

interface Props {}

const Account: React.FC<Props> = (props) => {
  const userData = useAppSelector((state) => state.user.user!);
  const dispatch = useAppDispatch();

  const [name, setName] = useState(userData.name);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [sex, setSex] = useState<"male" | "female">(userData.sex);

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
        <Button
          color={colors.success}
          onPress={() => console.log("Update User")}
        >
          Save
        </Button>
        <Button color={colors.error} onPress={() => dispatch(signoutUser())}>
          Log Out
        </Button>
      </KeyboardAwareScrollView>
    </Layout>
  );
};

export default Account;
