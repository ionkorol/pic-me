import React, { useEffect, useState } from "react";
import MainNavigation from "./src/navigation/Main";

import { Provider } from "react-redux";
import store from "./src/redux/store";
import firebase from "./src/utils/firebase";
import {
  USER_CLEAR,
  USER_GET_FAILURE,
  USER_GET_REQUEST,
  USER_GET_SUCCESS,
} from "./src/redux/actions/types";
import { View, Text, StyleSheet, Button, Linking } from "react-native";
import * as Permissions from "expo-permissions";
import { Layout } from "./src/components/common";
import { classes } from "./src/styles";
import { colors } from "./src/styles/variables";
import { TouchableOpacity } from "react-native-gesture-handler";

interface Props {}

const App: React.FC<Props> = (props) => {
  const [
    permissions,
    askPermissions,
    getPermissions,
  ] = Permissions.usePermissions([Permissions.CAMERA, Permissions.LOCATION], {
    ask: true,
  });
  const [user, setUser] = useState<firebase.User | null>(null);

  useEffect(() => {
    const unsub = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });

    return () => unsub();
  }, []);

  useEffect(() => {
    const { dispatch } = store;
    if (user) {
      const { uid } = user;
      const unsub = firebase
        .firestore()
        .collection("users")
        .doc(uid)
        .onSnapshot(async (dataSnap) => {
          const data = dataSnap.data();
          dispatch({ type: USER_GET_REQUEST, payload: null });
          try {
            dispatch({
              type: USER_GET_SUCCESS,
              payload: data,
            });
          } catch (error) {
            dispatch({ type: USER_GET_FAILURE, payload: error });
          }
        });
      return () => unsub();
    } else {
      dispatch({ type: USER_CLEAR, payload: null });
    }
  }, [user]);


  // Requests Camera and Location Permisions
  // useEffect(() => {
  //   (async () => {
  //     const { status } = await Camera.requestPermissionsAsync();
  //     setCameraPermissions(status === "granted");
  //   })();

  //   (async () => {
  //     let { status } = await Location.requestPermissionsAsync();
  //     setLocationPermissions(status === "granted");
  //   })();
  // }, []);

  if (!permissions || permissions.status !== "granted") {
    return (
      <Layout>
        <View style={styles.pContainer}>
          <View style={styles.pHead}>
            <Text style={classes.h1}>Permissions</Text>
          </View>
          <View style={styles.pContent}>
            <Text style={{ fontSize: 25 }}>Permissions not granted!</Text>
            <TouchableOpacity onPress={askPermissions}>
              <Text>ASK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Layout>
    );
  }

  return (
    <Provider store={store}>
      <MainNavigation />
    </Provider>
  );
};

export default App;

const styles = StyleSheet.create({
  pContainer: {
    width: "80%",
    alignSelf: "center",
  },
  pHead: {
    backgroundColor: colors.secondary,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    paddingVertical: 10,
    alignItems: "center",
  },
  pContent: {
    backgroundColor: colors.gray,
    alignItems: "center",
    paddingVertical: 50,
  },
});
