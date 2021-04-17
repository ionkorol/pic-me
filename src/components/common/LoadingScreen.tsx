import React from "react";
import { ActivityIndicator } from "react-native";
import Layout from "./Layout";

const LoadingScreen = () => {
  return (
    <Layout>
      <ActivityIndicator size="large" />
    </Layout>
  );
};

export default LoadingScreen;
