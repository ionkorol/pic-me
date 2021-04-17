import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import HomeNavigation from "./Home";
import AuthNavigation from "./Auth";
import { RootState } from "../redux/store";
import { connect } from "react-redux";
import { UserProp } from "../utils/interfaces";

interface Props {
  data: UserProp;
}

const Main: React.FC<Props> = (props) => {
  const { data } = props;
  return (
    <NavigationContainer>
      {data ? <HomeNavigation /> : <AuthNavigation />}
    </NavigationContainer>
  );
};

const mapState = (state: RootState) => ({
  data: state.user.data,
});
export default connect(mapState)(Main);
