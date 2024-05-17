import { createSlice } from '@reduxjs/toolkit'

export const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cart: [],
    status: 'idle',
    error: null,
  },
  reducers: {
    set: (state, action) => {
      state.cart = action.payload
      state.status = 'succeeded'
    },
    add: (state, action) => {
      const product = state.cart.find((item) => item._id === action.payload._id)
      if (product) {
        product.quantity++
      } else {
        state.cart.push({ ...action.payload, quantity: 1 })
      }
    },
    removeOne: (state, action) => {
      const product = state.cart.find((item) => item._id === action.payload._id)
      if (product && product.quantity > 1) {
        product.quantity--
      }
    },
    removeAll: (state, action) => {
      state.cart = state.cart.filter((item) => item._id !== action.payload._id)
    },
  },
})

export const { set, add, removeOne, removeAll } = cartSlice.actions

export const cartReducer = cartSlice.reducer
