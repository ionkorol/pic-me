import { Box } from "native-base";
import React from "react";
import { View, SafeAreaView, StatusBar } from "react-native";
import { colors } from "style/variables";

const Layout: React.FC = (props) => {
  return (
    <View style={{ flex: 1, backgroundColor: colors.primary }}>
      <StatusBar barStyle="light-content" />
      <SafeAreaView style={{ flex: 1 }}>
        <Box flex={1}>{props.children}</Box>
      </SafeAreaView>
    </View>
  );
};

export default Layout;
