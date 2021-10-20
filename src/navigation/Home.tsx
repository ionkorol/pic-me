import React from "react";

import {
  HomeScreen,
  AccountScreen,
  CameraScreen,
  ResultScreen,
  LeaderBoardScreen,
} from "screens";

import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

interface Props {}

const HomeNavigation: React.FC<Props> = (props) => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Account" component={AccountScreen} />
      <Stack.Screen name="Camera" component={CameraScreen} />
      <Stack.Screen name="Result" component={ResultScreen} />
      <Stack.Screen name="LeaderBoard" component={LeaderBoardScreen} />
    </Stack.Navigator>
  );
};

export default HomeNavigation;
