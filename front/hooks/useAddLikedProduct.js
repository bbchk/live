import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useAddLikedProduct = () => {
  const [error, setError] = useState(null);
  const { dispatch } = useAuthContext();

  const likeProduct = (productId) => {
    setError(false);

    const user = JSON.parse(localStorage.getItem("user"));
    const token = user.token;
    return fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/user/addLikedProduct`, {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ productId: productId }),
    })
      .then((response) => {
        if (!response.ok) {
          console.log("error");
          return response.json().then((result) => {
            throw new Error(result.error);
          });
        }
        return response.json();
      })
      .then((json) => {
        user.likedProducts.push(productId);
        localStorage.setItem("user", JSON.stringify(user));
        dispatch({ type: "ADD_LIKED_PRODUCT", payload: JSON.stringify(user) });
      })
      .catch((error) => {
        console.error("Fetch Error:", error);

        setError(error);
      });
  };

  return { likeProduct, error };
};
