import React, { useState } from "react";
import { View, StyleSheet, TextInput, Text } from "react-native";
import Layout from "../components/common/Layout";
import { Button, Input } from "../components/ui";
import { useNavigation } from "@react-navigation/core";
import { connect } from "react-redux";
import { UserProp } from "../utils/interfaces";
import { RootState } from "../redux/store";
import * as userActions from "../redux/actions/userActions";
import { Logo } from "../components/common";

interface Props {
  loading: boolean;
  data: UserProp;
  error: any;
  userRegister: (email: string, password: string, name: string) => void;
}

const Register: React.FC<Props> = (props) => {
  const { userRegister } = props;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const nav = useNavigation();

  return (
    <Layout>
      <View style={styles.container}>
        <Logo />
      </View>
      <View style={{ paddingHorizontal: 50 }}>
        <Input value={name} onChangeText={setName} placeholder="FULL NAME" />
        <Input value={email} onChangeText={setEmail} placeholder="EMAIL" />
        <Input
          value={password}
          onChangeText={setPassword}
          placeholder="PASSWORD"
        />
        <Button onPress={() => userRegister(email, password, name)}>
          Register
        </Button>
        <Button onPress={() => nav.navigate("Login")} color="#DB4437">
          Log in
        </Button>
      </View>
    </Layout>
  );
};

const mapState = (state: RootState) => ({
  loading: state.user.loading,
  data: state.user.data,
  error: state.user.error,
});

const mapDispatch = {
  userRegister: userActions.register,
};

export default connect(mapState, mapDispatch)(Register);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    paddingHorizontal: 50,
  },
  input: {
    borderBottomWidth: 2,
    borderBottomColor: "#fff",
    padding: 10,
    fontSize: 30,
    marginBottom: 30,
    color: "white",
    textAlign: "center",
  },
});
