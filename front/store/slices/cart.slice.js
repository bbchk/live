// import { createSlice } from '@reduxjs/toolkit'

// export const cartSlice = createSlice({
//   name: 'user',
//   initialState: {
//     user: null,
//     cart: [],
//     status: 'idle',
//     error: null,
//   },
//   reducers: {
//     signIn: (state, action) => {
//       state.user = action.payload
//     },
//     signOut: (state) => {
//       state.user = null
//     },
//     setCart: (state, action) => {
//       state.user.cart = action.payload
//     },
//     addToCart: (state, action) => {
//       if (state.user && Array.isArray(state.user.cart)) {
//         const existingItemIndex = state.user.cart.findIndex(
//           (item) => item.product._id === action.payload.product._id,
//         )

//         if (existingItemIndex >= 0) {
//           state.user.cart[existingItemIndex].quantity += action.payload.quantity
//         } else {
//           state.user.cart.push(action.payload)
//         }
//       } else {
//         state.user = { cart: [action.payload] }
//       }
//     },
//     deleteCartItem: (state, action) => {
//       if (state.user && Array.isArray(state.user.cart)) {
//         const existingItemIndex = state.user.cart.findIndex(
//           (item) => item.product._id === action.payload,
//         )

//         if (existingItemIndex >= 0) {
//           if (state.user.cart[existingItemIndex].quantity > 1) {
//             state.user.cart[existingItemIndex].quantity -= 1
//           } else {
//             state.user.cart.splice(existingItemIndex, 1)
//           }
//         }
//       }
//     },
//   },
// })

// export const { setCart, addToCart, deleteCartItem } = cartSlice.actions

// export const cartReducer = cartSlice.reducer
