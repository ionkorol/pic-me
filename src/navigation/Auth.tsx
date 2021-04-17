import { useNavigation } from "@react-navigation/core";
import { createStackNavigator } from "@react-navigation/stack";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { RootState } from "../redux/store";

import Login from "../screens/Login";
import Register from "../screens/Register";
import { UserProp } from "../utils/interfaces";

const Stack = createStackNavigator();

interface Props {
  userData: UserProp;
  userLoading: boolean
}

const AuthNavigation: React.FC<Props> = (props) => {
  const { userData } = props;

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
    </Stack.Navigator>
  );
};

const mapState = (state: RootState) => ({
  userData: state.user.data,
  userLoading: state.user.loading
});

export default connect(mapState)(AuthNavigation);
