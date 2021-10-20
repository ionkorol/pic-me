import {
  createAsyncThunk,
  createSlice,
  PayloadAction,
  SerializedError,
} from "@reduxjs/toolkit";
import firebase from "firebase";
import { RootState } from "store/store";
import { UserProp, UserWithCredentialsProp } from "utils/interfaces";

const initialState: {
  loading: boolean;
  user: UserProp | null;
  credentials: firebase.User | null;
  error: SerializedError | null;
} = {
  loading: false,
  user: null,
  credentials: null,
  error: null,
};

export const signinUser = createAsyncThunk(
  "user/signin",
  async (data: { email: string; password: string }) => {
    const { user } = await firebase
      .auth()
      .signInWithEmailAndPassword(data.email, data.password);
    const userData = (
      await firebase.firestore().collection("users").doc(user?.uid).get()
    ).data();
    return userData as UserProp;
  }
);

export const signupUser = createAsyncThunk<
  UserProp,
  Omit<UserWithCredentialsProp, "id" | "totalPoints" | "categories">
>("user/signup", async (data) => {
  const user = (
    await firebase
      .auth()
      .createUserWithEmailAndPassword(data.email, data.password)
  ).user;
  const userObject = {
    id: user!.uid,
    email: data.email,
    name: data.name,
    sex: data.sex,
    totalPoints: 0,
    categories: {},
  };

  await firebase.firestore().collection("users").doc(user!.uid).set(userObject);

  return userObject;
});

export const signoutUser = createAsyncThunk("user/signout", async () => {
  await firebase.auth().signOut();
});

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setCredentials: (
      state,
      { payload }: PayloadAction<firebase.User | null>
    ) => {
      state.credentials = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(signinUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(signinUser.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.user = payload;
      state.error = null;
    });
    builder.addCase(signinUser.rejected, (state, { error }) => {
      state.loading = false;
      state.error = error;
    });
    builder.addCase(signupUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(signupUser.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.user = payload;
      state.error = null;
    });
    builder.addCase(signupUser.rejected, (state, { error }) => {
      state.loading = false;
      state.error = error;
    });
    builder.addCase(signoutUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(signoutUser.fulfilled, (state) => {
      state.loading = false;
      state.user = null;
      state.error = null;
    });
    builder.addCase(signoutUser.rejected, (state, { error }) => {
      state.loading = false;
      state.error = error;
    });
  },
});

export default userSlice.reducer;
export const { setCredentials } = userSlice.actions;
