import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

export const userSlice = createSlice({
  name: 'user',
  initialState: { user: null },
  reducers: {
    signIn: (state, action) => {
      state.user = action.payload
    },
    signOut: (state) => {
      state.user = null
    },
    //todo
    // addLikedProduct: (state, action) => {
    //   state.user = [...state.user, action.payload];
    // },
    setCart: (state, action) => {
      state.user.cart = action.payload
    },
    addToCart: (state, action) => {
      if (state.user && Array.isArray(state.user.cart)) {
        const existingItemIndex = state.user.cart.findIndex(
          (item) => item.product._id === action.payload.product._id,
        )

        if (existingItemIndex >= 0) {
          state.user.cart[existingItemIndex].quantity += action.payload.quantity
        } else {
          state.user.cart.push(action.payload)
        }
      } else {
        state.user = { cart: [action.payload] }
      }
    },
    deleteCartItem: (state, action) => {
      if (state.user && Array.isArray(state.user.cart)) {
        const existingItemIndex = state.user.cart.findIndex(
          (item) => item.product._id === action.payload,
        )

        if (existingItemIndex >= 0) {
          if (state.user.cart[existingItemIndex].quantity > 1) {
            state.user.cart[existingItemIndex].quantity -= 1
          } else {
            state.user.cart.splice(existingItemIndex, 1)
          }
        }
      }
    },
  },
})

export const { signIn, signOut, setCart, addToCart, deleteCartItem } =
  userSlice.actions

export const userReducer = userSlice.reducer
