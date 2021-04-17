import firebase from "../../utils/firebase";
import { AppDispatch } from "../store";
import { USER_GET_REQUEST, USER_GET_SUCCESS, USER_GET_FAILURE } from "./types";

export const logIn = (email: string, password: string) => async (
  dispatch: AppDispatch
) => {
  dispatch({ type: USER_GET_REQUEST, payload: null });
  try {
    const { user } = await firebase
      .auth()
      .signInWithEmailAndPassword(email, password);
    const data = (
      await firebase.firestore().collection("users").doc(user?.uid).get()
    ).data();

    dispatch({ type: USER_GET_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: USER_GET_FAILURE, payload: error });
  }
};

export const register = (
  email: string,
  password: string,
  name: string
) => async (dispatch: AppDispatch) => {
  try {
    const user = (
      await firebase.auth().createUserWithEmailAndPassword(email, password)
    ).user;
    if (user) {
      const userObject = {
        email,
        name,
        id: user.uid,
      };
      await firebase
        .firestore()
        .collection("users")
        .doc(user.uid)
        .set(userObject);
      dispatch({ type: USER_GET_SUCCESS, payload: userObject });
    } else {
      dispatch({ type: USER_GET_FAILURE, payload: "Error" });
    }
  } catch (error) {
    dispatch({ type: USER_GET_FAILURE, payload: error });
  }
};

export const logOut = () => async (dispatch: AppDispatch) => {
  firebase.auth().signOut();
};
