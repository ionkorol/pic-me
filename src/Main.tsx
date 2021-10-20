import firebase from "firebase";
import React, { useEffect } from "react";
import { setCredentials } from "store/slices/userSlice";
import { useAppDispatch } from "store/store";
import MainNavigation from "navigation/Main";

const Main = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const unsub = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        dispatch(setCredentials(user.toJSON() as firebase.User));
      } else {
        dispatch(setCredentials(null));
      }
    });

    return () => unsub();
  }, []);

  return <MainNavigation />;
};

export default Main;
