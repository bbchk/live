import { createSlice } from '@reduxjs/toolkit'

const searchSlice = createSlice({
  name: 'search',
  initialState: {
    searchRes: null,
    status: 'idle',
    error: null,
  },
  reducers: {
    setSearchRes: (state, action) => {
      state.searh = action.payload
      state.status = 'success'
    },
    removeSearchRes: (state) => {
      state.products = []
      state.status = 'idle'
    },
  },
})

export const { setSearchRes, removeSearchRes } = searchSlice.actions

export const searchReducer = searchSlice.reducer
