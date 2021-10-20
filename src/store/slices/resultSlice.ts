import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import firebase from "firebase";
import { RootState } from "store/store";
import * as Location from "expo-location";

const initialState: {
  result: "win" | "loss" | null;
} = {
  result: null,
};

export const rewardUser = createAsyncThunk<
  string,
  string,
  { state: RootState }
>("user/reward", async (category: string, { getState }) => {
  const user = getState().user.user!;

  const { longitude, latitude } = (
    await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.Balanced,
    })
  ).coords;

  await firebase
    .firestore()
    .collection("users")
    .doc(user.id)
    .update({
      [`categories.${category}.points`]:
        firebase.firestore.FieldValue.increment(1),
      [`categories.${category}.location`]: { longitude, latitude },
      totalPoints: firebase.firestore.FieldValue.increment(1),
    });

  return category;
});

const resultSlice = createSlice({
  name: "result",
  initialState,
  reducers: {
    setResult: (state, { payload }: PayloadAction<"win" | "loss">) => {
      state.result = payload;
    },
  },
  extraReducers: (builder) => {},
});

export default resultSlice.reducer;
export const { setResult } = resultSlice.actions;
