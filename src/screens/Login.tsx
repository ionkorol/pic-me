import React, { useCallback, useEffect, useState } from "react";
import { View, TextInput, StyleSheet, Text } from "react-native";
import Layout from "../components/common/Layout";
import Button from "../components/ui/Button";
import { connect, RootStateOrAny } from "react-redux";
import { useFocusEffect, useNavigation } from "@react-navigation/core";
import { colors } from "../styles/variables";
import * as userActions from "../redux/actions/userActions";
import { Input } from "../components/ui";
import { Logo } from "../components/common";

interface Props {
  loading: boolean;
  data: any;
  error: any;
  userLogIn: (email: string, password: string) => void;
}

const Login: React.FC<Props> = (props) => {
  const { loading, data, error, userLogIn } = props;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const nav = useNavigation();

  return (
    <Layout>
      <View style={styles.container}>
        <Logo />
      </View>
      <View style={styles.container}>
        <Input value={email} onChangeText={setEmail} placeholder="EMAIL" />
        <Input
          value={password}
          onChangeText={setPassword}
          placeholder="PASSWORD"
        />
        <Button onPress={() => userLogIn(email, password)}>
          {loading ? "Loading..." : "Log In"}
        </Button>
        <Button onPress={() => nav.navigate("Register")} color="#DB4437">
          Register
        </Button>
      </View>
    </Layout>
  );
};

const mapState = (state: RootStateOrAny) => ({
  loading: state.user.loading,
  data: state.user.data,
  error: state.user.error,
});

const mapDispatch = {
  userLogIn: userActions.logIn,
};

export default connect(mapState, mapDispatch)(Login);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    paddingHorizontal: 50,
  },
});
