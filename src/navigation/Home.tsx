import React, { useEffect } from "react";

import MainScreen from "../screens/Main";
import AccountScreen from "../screens/Account";
import CameraScreen from "../screens/Camera";
import ResultScreen from "../screens/Result";
import LeaderBoardScreen from "../screens/LeaderBoard";
import { UserProp } from "../utils/interfaces";
import { RootState } from "../redux/store";
import { connect } from "react-redux";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

interface Props {
  userData: UserProp;
  userLoading: boolean;
}

const HomeNavigation: React.FC<Props> = (props) => {
  const { userData, userLoading } = props;

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={MainScreen} />
      <Stack.Screen name="Account" component={AccountScreen} />
      <Stack.Screen name="Camera" component={CameraScreen} />
      <Stack.Screen name="Result" component={ResultScreen} />
      <Stack.Screen name="LeaderBoard" component={LeaderBoardScreen} />
    </Stack.Navigator>
  );
};

const mapState = (state: RootState) => ({
  userData: state.user.data!,
  userLoading: state.user.loading,
});

export default connect(mapState)(HomeNavigation);
