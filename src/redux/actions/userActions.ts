import firebase from "../../utils/firebase";
import { AppDispatch, RootState } from "../store";
import {
  USER_GET_REQUEST,
  USER_GET_SUCCESS,
  USER_GET_FAILURE,
  USER_ERROR_CLEAR,
} from "./types";

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
  name: string,
  sex: "male" | "female"
) => async (dispatch: AppDispatch) => {
  try {
    const user = (
      await firebase.auth().createUserWithEmailAndPassword(email, password)
    ).user;
    if (user) {
      const userObject = {
        id: user.uid,
        email,
        name,
        sex,
        totalPoints: 0,
        categories: {},
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

export const save = (
  name: string,
  sex: "male" | "female",
  password?: string
) => async (dispatch: AppDispatch, getState: () => RootState) => {
  const user = getState().user.data!;
  try {
    await firebase.firestore().collection("users").doc(user.id).update({
      name,
      sex,
    });
  } catch (error) {
    console.log(error);
  }
};

export const errorClear = () => (dispatch: AppDispatch) => {
  dispatch({ type: USER_ERROR_CLEAR, payload: null });
};
