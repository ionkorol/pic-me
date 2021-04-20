import React, { useCallback, useEffect, useState } from "react";
import { View, StyleSheet, TextInput, Text, Alert } from "react-native";
import Layout from "../components/common/Layout";
import { Button, Input, SexSelect } from "../components/ui";
import { useFocusEffect, useNavigation } from "@react-navigation/core";
import { connect } from "react-redux";
import { UserProp } from "../utils/interfaces";
import { RootState } from "../redux/store";
import * as userActions from "../redux/actions/userActions";
import { Logo } from "../components/common";
import { colors } from "../styles/variables";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

interface Props {
  loading: boolean;
  data: UserProp;
  error: any;
  userRegister: typeof userActions.register;
  userErrorClear: typeof userActions.errorClear;
}

const Register: React.FC<Props> = (props) => {
  const { loading, error, userRegister, userErrorClear } = props;

  const [name, setName] = useState("");
  const [sex, setSex] = useState<"male" | "female">("male");
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
            onPress={() => userRegister(email, password, name, sex)}
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

const mapState = (state: RootState) => ({
  loading: state.user.loading,
  data: state.user.data!,
  error: state.user.error,
});

const mapDispatch = {
  userRegister: userActions.register as any,
  userErrorClear: userActions.errorClear as any,
};

export default connect(mapState, mapDispatch)(Register);

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    justifyContent: "center",
    paddingHorizontal: 50,
  },
});
