import { createContext, useReducer } from "react";

export const ActiveFiltersContext = createContext();

export const activeFiltersReducer = (state, action) => {
  switch (action.type) {
    case "SET_ACTIVE_FILTERS":
      return {
        activeFilters: action.payload,
      };
    case "ADD_FILTER":
      return {
        activeFilters: [action.payload, ...state.activeFilters],
      };
    case "REMOVE_FILTER":
      return {
        activeFilters: state.activeFilters.filter((f) => {
          if (
            f.prop !== action.payload.prop ||
            f.option !== action.payload.option
          ) {
            return f;
          }
        }),
      };
    default:
      return state;
  }
};

export const ActiveFiltersContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(activeFiltersReducer, {
    activeFilters: [],
  });

  return (
    <ActiveFiltersContext.Provider value={{ ...state, dispatch }}>
      {children}
    </ActiveFiltersContext.Provider>
  );
};
