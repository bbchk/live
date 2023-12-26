import {
  SET_CATEGORIES,
  CREATE_CATEGORY,
} from "root/actions/categoriesActions";

export const categoriesReducer = (state = { categories: null }, action) => {
  if (action.type === SET_CATEGORIES) {
    return {
      ...state,
      categories: action.payload,
    };
  }

  if (action.type === CREATE_CATEGORY) {
    return {
      ...state,
      categories: [action.payload, ...state.categories],
    };
  }

  return state;
};
