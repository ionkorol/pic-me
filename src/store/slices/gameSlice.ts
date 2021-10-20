import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";

const initialState: {
  image: string | null;
} = {
  image: null,
};

const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    setImage: (state, { payload }: PayloadAction<string | null>) => {
      state.image = payload;
    },
  },
});

export default gameSlice.reducer;
export const { setImage } = gameSlice.actions;
