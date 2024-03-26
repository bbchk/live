export const useAddToCart = () => {
  async function addToCart(user, productId) {
    try {
      let cart = JSON.parse(localStorage.getItem("cart"));

      if (cart == null) {
        cart = [];
        cart.push({ productId: productId, quantity: 1 });
      } else {
        let cartItem = cart.find((item) => item.productId == productId);

        if (cartItem) {
          cartItem.quantity++;
        } else {
          cart.push({
            product: productId,
            quantity: 1,
          });
        }
      }
      localStorage.setItem("cart", JSON.stringify(cart));

      if (user) {
        const response = await axios.post(
          `/user/addToCart/${user.id}/${productId}`
        );
        const json = response.data;
      }
    } catch (e) {
      console.log(e);
    }
  }

  return { addToCart };
};
