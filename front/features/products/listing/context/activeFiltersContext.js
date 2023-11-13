import { createContext, useReducer } from "react";

export const ActiveFiltersContext = createContext();

export const activeFiltersReducer = (state, action) => {
  const prop = action.payload.prop;
  const option = action.payload.option;
  switch (action.type) {
    case "SET_ACTIVE_FILTERS":
      return {
        activeFilters: action.payload,
      };
    case "ADD_FILTER":
      if (!state.activeFilters[prop].includes(option)) {
        return {
          ...state,
          activeFilters: {
            ...state.activeFilters,
            [prop]: [...state.activeFilters[prop], option],
          },
        };
      }
      return state;
    case "REMOVE_FILTER":
      return {
        ...state,
        activeFilters: {
          ...state.activeFilters,
          [prop]: state.activeFilters[prop].filter((item) => item !== option),
        },
      };
    case "SET_MIN_MAX_PRICE":
      return {
        ...state,
        minMaxPrice: action.payload,
      };
    case "SET_SORT_BY":
      return {
        ...state,
        sortBy: action.payload,
      };
    default:
      return state;
  }
};

export const ActiveFiltersContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(activeFiltersReducer, {
    minMaxPrice: [-Infinity, Infinity],
    sortBy: null,
    activeFilters: { brand: [], packing: [], color: [], size: [], weight: [] },
  });

  return (
    <ActiveFiltersContext.Provider value={{ ...state, dispatch }}>
      {children}
    </ActiveFiltersContext.Provider>
  );
};
