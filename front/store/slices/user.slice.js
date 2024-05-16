import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null,
    isTabbing: false,
    status: 'idle',
    error: null,
  },
  reducers: {
    signIn: (state, action) => {
      state.user = action.payload
    },
    signOut: (state) => {
      state.user = null
    },
  },
})

export const { signIn, signOut, setCart, addToCart, deleteCartItem } =
  userSlice.actions

export const userReducer = userSlice.reducer
