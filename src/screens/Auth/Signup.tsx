import React, { useCallback, useEffect, useState } from "react";
import { View, StyleSheet, TextInput, Text, Alert } from "react-native";
import Layout from "components/common/Layout";
import { Button, Input, SexSelect } from "components/ui";
import { useFocusEffect, useNavigation } from "@react-navigation/core";
import { connect } from "react-redux";
import { UserProp } from "utils/interfaces";
import { RootState, useAppDispatch, useAppSelector } from "store/store";
import { Logo } from "components/common";
import { colors } from "style/variables";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { signupUser } from "store/slices/userSlice";

interface Props {}

const Signup: React.FC<Props> = (props) => {
  const { user, loading, error } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  const [name, setName] = useState("");
  const [sex, setSex] = useState<"male" | "female">("male");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const nav = useNavigation();

  useFocusEffect(
    useCallback(() => {
      if (error && error.message) {
        Alert.alert(error.message);
        // Clear Error
      }
    }, [error])
  );

  return (
    <Layout>
      <KeyboardAwareScrollView
        contentContainerStyle={{ flex: 1, justifyContent: "space-around" }}
      >
        <View style={styles.container}>
          <Logo />
        </View>
        <View style={{ paddingHorizontal: 50 }}>
          <Input value={name} onChangeText={setName} placeholder="FULL NAME" />
          <SexSelect value={sex} setValue={setSex} />
          <Input value={email} onChangeText={setEmail} placeholder="EMAIL" />
          <Input
            value={password}
            onChangeText={setPassword}
            placeholder="PASSWORD"
            secureTextEntry
          />
          <Button
            disabled={loading}
            onPress={() => dispatch(signupUser({ name, sex, email, password }))}
          >
            {loading ? "Registering..." : "Register"}
          </Button>
          <Button onPress={() => nav.navigate("Login")} color={colors.error}>
            Log in
          </Button>
        </View>
      </KeyboardAwareScrollView>
    </Layout>
  );
};

export default Signup;

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    justifyContent: "center",
    paddingHorizontal: 50,
  },
});
