import { createSlice } from "@reduxjs/toolkit";

const filtersSlice = createSlice({
  name: "filters",
  initialState: {
    filters: {},
    status: "idle",
    error: null,
  },
  reducers: {
    setFilters: (state, action) => {
      state.filters = action.payload;
    },
    setFilter: (state, action) => {
      state.filters[action.payload.filterName] = action.payload.filterValue;
    },
    deleteFilter: (state, action) => {
      delete state.filters[action.payload.filterName];
    },
    deleteAllFilters: (state) => {
      const page = state.filters.page;
      state.filters = { page: page ? page : ["1"] };
    },
    updateFilter: (state, action) => {
      if (state.filters[action.payload.filterName]) {
        state.filters[action.payload.filterName] = action.payload.filterValues;
      }
    },
  },
});

export const {
  setFilters,
  setFilter,
  deleteFilter,
  updateFilter,
  deleteAllFilters,
} = filtersSlice.actions;

export const filtersReducer = filtersSlice.reducer;
