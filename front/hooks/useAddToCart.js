import axios from "axios";
import { useSession } from "next-auth/react";
import { use } from "react";

export const useAddToCart = () => {
  const { data: session, update } = useSession();

  async function addToCart(product) {
    const { _id, name, price, images, left } = product;
    const cartItem = { _id, name, price, images, left };

    try {
      let cart = JSON.parse(localStorage.getItem("cart")) || [];
      let existingCartItem = cart.find(
        (item) => item.product._id == cartItem._id
      );

      if (existingCartItem) {
        existingCartItem.quantity++;
      } else {
        cart.push({
          product: { ...cartItem },
          quantity: 1,
        });
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
          `/user/cart/${session.user.id}/add/${_id}`
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
