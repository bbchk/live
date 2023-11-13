import { ActiveFiltersContext } from "../context/activeFiltersContext";
import { useContext } from "react";

export const useActiveFiltersContext = () => {
  const context = useContext(ActiveFiltersContext);

  if (!context) {
    throw Error("context used outside of context provider");
  }

  return context;
};
