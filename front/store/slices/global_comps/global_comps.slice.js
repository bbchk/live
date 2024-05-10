import { main } from '@popperjs/core';
import { createSlice } from '@reduxjs/toolkit';
import { GLOBAL_COMPS as G } from './constants';
export { G as GLOBAL_COMPS };

const initialState = {
  loading: false, // loading overlay
  // offcanvases
  [G.MAIN_OFFCANVAS]: false,
  [G.FILTER_OFFCANVAS]: false,
  // modals
  [G.HOTKEYS_MODAL]: false,
  [G.SIGN_IN_MODAL]: false,
  [G.SIGN_UP_MODAL]: false,
  [G.CHANGE_PASSWORD_MODAL]: false,
  [G.DELETE_ACCOUNT_MODAL]: false,
  [G.CART_MODAL]: false,
  [G.WRITE_REVIEW_MODAL]: false,
};

const modalsSlice = createSlice({
  name: 'modals',
  initialState,
  reducers: {
    toggle: (state, action) => {
      //todo modals close other modals if open
      // Object.assign(state, initialState);

      const activeModalKey = action.payload;
      state[activeModalKey] = !state[activeModalKey];
    },
    startLoading: (state) => {
      state.loading = true;
    },
    stopLoading: (state) => {
      state.loading = false;
    },
  },
});

export const { toggle, startLoading, stopLoading } = modalsSlice.actions;

export const modalsReducer = modalsSlice.reducer;
