import { createSlice } from '@reduxjs/toolkit'

export const wishListSlice = createSlice({
  name: 'wishList',
  initialState: {
    wishList: [],
    status: 'idle',
    error: null,
  },
  reducers: {
    set: (state, action) => {
      state.wishList = action.payload
      state.status = 'succeeded'
    },
    add: (state, action) => {
      state.wishList = [...state.wishList, action.payload]
    },
    remove: (state, action) => {
      state.wishList = state.wishList.filter((id) => id !== action.payload)
    },
  },
})

export const { set, add, remove } = wishListSlice.actions

export const wishListReducer = wishListSlice.reducer
