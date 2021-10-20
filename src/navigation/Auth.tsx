import { createStackNavigator } from "@react-navigation/stack";
import React from "react";

import { Signin, Signup } from "screens/Auth/";

const Stack = createStackNavigator();

interface Props {}

const AuthNavigation: React.FC<Props> = (props) => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Signin" component={Signin} />
      <Stack.Screen name="Signup" component={Signup} />
    </Stack.Navigator>
  );
};

export default AuthNavigation;
