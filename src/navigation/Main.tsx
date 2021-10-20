import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import HomeNavigation from "./Home";
import AuthNavigation from "./Auth";
import { useAppSelector } from "store/store";
import { UserProp } from "utils/interfaces";

interface Props {}

const Main: React.FC<Props> = (props) => {
  const { user, loading } = useAppSelector((state) => state.user);

  return (
    <NavigationContainer>
      {user ? <HomeNavigation /> : <AuthNavigation />}
    </NavigationContainer>
  );
};

export default Main;
