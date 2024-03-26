export const useAddToCart = () => {
  async function addToCart(product) {
    try {
      window.localStorage.setItem(key, JSON.stringify(product));

      const response = await axios.post(
        `/user/cart/add`,
        { product },
        { headers: { "Content-type": "application/json" } }
      );
      const json = response.data;
    } catch (e) {
      console.log(e);
    }
  }

  return { addToCart };
};
