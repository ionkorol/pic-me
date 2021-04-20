import { AppDispatch, RootState } from "../store";
import {
  GAME_SET_CATEGORY,
  GAME_CLEAR_CATEGORY,
  GAME_REWARD_POINT_REQUEST,
  GAME_REWARD_POINT_SUCCESS,
  GAME_REWARD_POINT_FAILURE,
} from "./types";
import firebase from "../../utils/firebase";
import * as Location from "expo-location";

export const setCategory = (category: string) => (dispatch: AppDispatch) => {
  dispatch({ type: GAME_SET_CATEGORY, payload: category });
};

export const clearCategory = () => (dispatch: AppDispatch) => {
  dispatch({ type: GAME_CLEAR_CATEGORY, payload: null });
};

export const rewardPoint = () => async (
  dispatch: AppDispatch,
  getState: () => RootState
) => {
  dispatch({ type: GAME_REWARD_POINT_REQUEST, payload: null });
  try {
    const { category } = getState().game;
    const userData = getState().user.data!;
    const { longitude, latitude } = (
      await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
      })
    ).coords;
    const userRef = firebase.firestore().collection("users").doc(userData.id);
    userRef.update({
      totalPoints: firebase.firestore.FieldValue.increment(1),
      [`categories.${category?.toLowerCase()}.points`]: firebase.firestore.FieldValue.increment(
        1
      ),
      [`categories.${category?.toLowerCase()}.location`]: new firebase.firestore.GeoPoint(
        latitude,
        longitude
      ),
    });
    dispatch({ type: GAME_REWARD_POINT_SUCCESS, payload: null });
  } catch (error) {
    dispatch({ type: GAME_REWARD_POINT_FAILURE, payload: error });
  }
};
