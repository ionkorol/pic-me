import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
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
import { Camera } from "expo-camera";
import * as Location from "expo-location";
import { View, Text } from "react-native";

interface Props {}

const App: React.FC<Props> = (props) => {
  const [user, setUser] = useState<firebase.User | null>(null);
  const [cameraPermissions, setCameraPermissions] = useState<boolean | null>(
    null
  );
  const [locationPermissions, setLocationPermissions] = useState<
    boolean | null
  >(null);

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
  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setCameraPermissions(status === "granted");
    })();

    (async () => {
      let { status } = await Location.requestPermissionsAsync();
      setLocationPermissions(status === "granted");
    })();
  }, []);

  if (!locationPermissions || !cameraPermissions) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text style={{ fontSize: 30 }}>Permissions not granted!</Text>
      </View>
    );
  }

  return (
    <Provider store={store}>
      <MainNavigation />
    </Provider>
  );
};

export default App;
