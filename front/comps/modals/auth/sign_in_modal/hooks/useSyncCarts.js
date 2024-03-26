import axios from "axios";

export const useSyncCarts = () => {
  async function syncCarts(user) {
    try {
      const { id, token } = user;
      const localStorageCart = JSON.parse(localStorage.getItem("cart")) || [];

      if (localStorageCart.length !== 0) {
        const res = await axios.patch(
          `/user/cart/${id}/sync`,
          localStorageCart,
          {
            headers: {
              "Content-type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(res.data);
        return res.data;
      } else {
        return user.cart;
      }
    } catch (e) {
      console.log(e);
    }
  }

  return { syncCarts };
};
