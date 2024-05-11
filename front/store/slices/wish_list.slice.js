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
      console.log(action.payload)
      state.wishList = action.payload
      state.status = 'succeeded'
    },
    add: (state, action) => {
      state.wishList = [...state.wishList, action.payload]
    },
    remove: (state, action) => {
      state.wishList = state.wishList.filter((id) => id !== action.payload)
    },
    setStatus: (state, action) => {
      state.status = 'meh'
    },
  },
})

export const { set, add, remove, setStatus } = wishListSlice.actions

export const wishListReducer = wishListSlice.reducer
