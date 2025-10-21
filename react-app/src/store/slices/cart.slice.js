import { createSlice } from '@reduxjs/toolkit'

export const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cart: [],
    totalCost: 0, // Add totalCost to your initial state
    status: 'idle',
    error: null,
  },
  reducers: {
    set: (state, action) => {
      state.cart = action.payload
      state.totalCost = action.payload.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0,
      ) // Calculate totalCost when setting the cart
      state.status = 'succeeded'
    },
    add: (state, action) => {
      const product = state.cart.find((item) => item._id === action.payload._id)

      if (product) {
        product.quantity++
      } else {
        state.cart.push({ ...action.payload, quantity: 1 })
      }

      state.totalCost += action.payload.price // Increase totalCost when adding a product
    },
    removeOne: (state, action) => {
      const product = state.cart.find((item) => item._id === action.payload._id)
      if (product && product.quantity > 1) {
        product.quantity--
        state.totalCost -= product.price // Decrease totalCost when removing one product
      }
    },
    removeAll: (state, action) => {
      const product = state.cart.find((item) => item._id === action.payload._id)
      if (product) {
        state.totalCost -= product.price * product.quantity // Decrease totalCost by the total price of the removed product
      }
      state.cart = state.cart.filter((item) => item._id !== action.payload._id)
    },
  },
})

export const { set, add, removeOne, removeAll } = cartSlice.actions

export const cartReducer = cartSlice.reducer
