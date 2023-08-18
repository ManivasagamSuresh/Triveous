import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
  
    loginSuccess: (state, action) => {
        // console.log(action.payload)
      state.currentUser = action.payload;
    },
   
    logout: (state) => {
      state.currentUser = null;
     
    },
    
    Addwishlist: (state, action) => {
      state.currentUser.wishlist.push(action.payload);
    },
    Removewishlist: (state, action) => {
      state.currentUser.wishlist.splice(
        state.currentUser.wishlist.findIndex(
          (ele) => ele == action.payload
        ),
        1
      );
      console.log(
        state.currentUser.wishlist.findIndex(
          (ele) => ele == action.payload
        )
      );
    },
  },
});

export const {
  loginSuccess,
  logout
} = userSlice.actions;

export default userSlice.reducer;
