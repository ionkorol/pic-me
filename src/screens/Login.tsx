import React, { useCallback, useEffect, useState } from "react";
import { View, TextInput, StyleSheet, Text, Alert } from "react-native";
import Layout from "../components/common/Layout";
import Button from "../components/ui/Button";
import { connect, RootStateOrAny } from "react-redux";
import { useFocusEffect, useNavigation } from "@react-navigation/core";
import { colors } from "../styles/variables";
import * as userActions from "../redux/actions/userActions";
import { Input } from "../components/ui";
import { Logo } from "../components/common";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

interface Props {
  loading: boolean;
  data: any;
  error: any;
  userLogIn: typeof userActions.logIn;
  userErrorClear: typeof userActions.errorClear;
}

const Login: React.FC<Props> = (props) => {
  const { loading, data, error, userLogIn, userErrorClear } = props;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const nav = useNavigation();
  useFocusEffect(
    useCallback(() => {
      if (error) {
        Alert.alert(error.message);
        userErrorClear();
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
          <Button disabled={loading} onPress={() => userLogIn(email, password)}>
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

const mapState = (state: RootStateOrAny) => ({
  loading: state.user.loading,
  data: state.user.data,
  error: state.user.error,
});

const mapDispatch = {
  userLogIn: userActions.logIn as any,
  userErrorClear: userActions.errorClear as any,
};

export default connect(mapState, mapDispatch)(Login);

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    justifyContent: "center",
    paddingHorizontal: 50,
  },
});
