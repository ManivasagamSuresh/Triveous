import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentArticle: null,
};

export const articleSlice = createSlice({
  name: "article",
  initialState,
  reducers: {
    setVideo: (state, action) => {
        // console.log(action.payload)
      state.currentArticle = action.payload;
    },
  },
});

export const {
    setVideo
} = articleSlice.actions;

export default articleSlice.reducer;
