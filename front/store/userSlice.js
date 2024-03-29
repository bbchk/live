import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const userSlice = createSlice({
  name: "user",
  initialState: { user: null },
  reducers: {
    signIn: (state, action) => {
      state.user = action.payload;
    },
    signOut: (state) => {
      state.user = null;
    },
    //todo
    // addLikedProduct: (state, action) => {
    //   state.user = [...state.user, action.payload];
    // },
    setCart: (state, action) => {
      state.user ??= { cart: action.payload };
    },
  },
});

export const { signIn, signOut, setCart } = userSlice.actions;

export const userReducer = userSlice.reducer;
