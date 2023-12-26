export const SET_PRODUCTS = "SET_PRODUCTS";

export function setProducts(products) {
  return { type: SET_PRODUCTS, payload: products };
}

export const fetchProducts = () => {
  return async (dispatch) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/products/`);
    const json = await res.json();

    if (res.ok) {
      dispatch(setProducts(json));
    }
  };
};
