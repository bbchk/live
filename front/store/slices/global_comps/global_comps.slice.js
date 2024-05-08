import { main } from "@popperjs/core";
import { createSlice } from "@reduxjs/toolkit";
import { GLOBAL_COMPS as G } from "./constants";
export { G as GLOBAL_COMPS };

const modalsSlice = createSlice({
  name: "modals",
  initialState: {
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
  },
  reducers: {
    toggle: (state, action) => {
      const activeModalKey = action.payload;

      for (let key of Object.values(G)) {
        if (key !== activeModalKey) {
          state[key] = false;
        }
      }
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
