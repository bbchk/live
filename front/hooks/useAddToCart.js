import axios from "axios";
import { useSession } from "next-auth/react";
import { use } from "react";

export const useAddToCart = () => {
  const { data: session, update } = useSession();

  async function addToCart(productId) {
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
            productId: productId,
            quantity: 1,
          });
        }
      }
      localStorage.setItem("cart", JSON.stringify(cart));

      if (session) {
        await update({
          ...session,
          user: {
            ...session.user,
            cart: cart,
          },
        });

        const response = await axios.post(
          `/user/cart/${session.user.id}/add/${productId}`
        );
        const json = response.data;
        console.log("🚀 ~ json:", json);
      }
    } catch (e) {
      console.log(e);
    }
  }

  return { addToCart };
};
