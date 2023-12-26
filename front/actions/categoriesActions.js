export const SET_CATEGORIES = "SET_CATEGORIES";
export const CREATE_CATEGORY = "CREATE_CATEGORY";

export function setCategories(categories) {
  return { type: SET_CATEGORIES, payload: categories };
}

export function createCategory(category) {
  return { type: CREATE_CATEGORY, payload: category };
}

export const fetchCategories = () => {
  return async (dispatch) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/categories/`);
    const json = await res.json();

    if (res.ok) {
      dispatch(setCategories(json));
    }
  };
};
