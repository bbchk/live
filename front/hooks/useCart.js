import axios from "axios";
import { useSession } from "next-auth/react";
import { useDispatch } from "react-redux";
import { setCart } from "store/userSlice";

export const useCart = () => {
  const dispatch = useDispatch();
  const { data: session, update } = useSession();

  async function add(product) {
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

  // async function subtract(productId) {
  //   try {
  //     let cart = JSON.parse(localStorage.getItem("cart")) || [];
  //     let cartItem = cart.find((item) => item.product._id === productId);

  //     if (cartItem && cartItem.quantity > 1) {
  //       cartItem.quantity--;
  //     } else if (cartItem) {
  //       cart = cart.filter((item) => item.product._id !== productId);
  //     }

  //     localStorage.setItem("cart", JSON.stringify(cart));

  //     if (session) {
  //       await update({
  //         ...session,
  //         user: {
  //           ...session.user,
  //           cart: cart,
  //         },
  //       });

  //       await axios.post(`/user/cart/${session.user.id}/decrease/${productId}`);
  //     }
  //   } catch (e) {
  //     console.log(e);
  //   }
  // }

  // async function remove(productId) {
  //   try {
  //     let cart = JSON.parse(localStorage.getItem("cart")) || [];
  //     cart = cart.filter((item) => item.product._id !== productId);

  //     localStorage.setItem("cart", JSON.stringify(cart));

  //     if (session) {
  //       await update({
  //         ...session,
  //         user: {
  //           ...session.user,
  //           cart: cart,
  //         },
  //       });

  //       await axios.post(`/user/cart/${session.user.id}/remove/${productId}`);
  //     }
  //   } catch (e) {
  //     console.log(e);
  //   }
  // }

  async function get(session) {
    try {
      const localStorageCartJson = localStorage.getItem("cart");
      const lscart = JSON.parse(localStorageCartJson) || [];

      let cart = [];

      //if local storage cart is not empty, sync it with user cart on sign in
      if (lscart.length > 0 && session) {
        const syncedCart = await syncAndFetch(session.user, lscart);
        //todo set synced cart to localStorage
        cart = syncedCart;
      } else {
        cart = await fetchCart(session.user.cart);
      }

      dispatch(setCart(cart));
    } catch (e) {
      console.log(e);
    }
  }

  async function syncAndFetch(user, lscart) {
    try {
      const localStorageCartOptimized = lscart.map((item) => {
        return { product: item.product._id, quantity: item.quantity };
      });

      const res = await axios.patch(
        `/user/cart/${user.id}/sync`,
        localStorageCartOptimized,
        {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      return res.data;
    } catch (e) {
      console.log(e);
    }
  }

  async function fetchCart() {
    try {
      const res = await axios.get(`/user/cart/${user.id}/fetch`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      return res.data;
    } catch (e) {
      console.log(e);
    }
  }

  // return { add, subtract, remove, sync };
  return { add, get };
};
