import React, { useCallback, useState } from "react";
import { View, StyleSheet, Alert } from "react-native";
import Layout from "components/common/Layout";
import Button from "components/ui/Button";
import { useFocusEffect, useNavigation } from "@react-navigation/core";
import { colors } from "style/variables";
import { Input } from "components/ui";
import { Logo } from "components/common";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useAppDispatch, useAppSelector } from "store/store";
import { signinUser } from "store/slices/userSlice";

interface Props {}

const Signin: React.FC<Props> = (props) => {
  const { user, loading, error } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
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
        <View style={styles.container}>
          <Input value={email} onChangeText={setEmail} placeholder="EMAIL" />
          <Input
            value={password}
            onChangeText={setPassword}
            placeholder="PASSWORD"
            secureTextEntry
          />
          <Button
            disabled={loading}
            onPress={() => dispatch(signinUser({ email, password }))}
          >
            {loading ? "Loading..." : "Log In"}
          </Button>
          <Button onPress={() => nav.navigate("Register")} color={colors.error}>
            Register
          </Button>
        </View>
      </KeyboardAwareScrollView>
    </Layout>
  );
};

export default Signin;

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    justifyContent: "center",
    paddingHorizontal: 50,
  },
});
