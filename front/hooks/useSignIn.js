import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import { setCookie } from "nookies";
import dotenv from "dotenv";
dotenv.config();

export const useSignIn = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useAuthContext();

  const signIn = async (email, password) => {
    setIsLoading(true);
    setError(false);

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/user/signIn`,
      {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ email, password }),
      }
    );

    const json = await response.json();
    if (!response.ok) {
      setIsLoading(false);
      setError(json.error);
    } else {
      const user = JSON.stringify(json);

      localStorage.setItem("user", user);
      dispatch({ type: "SIGN_IN", payload: json });
      setCookie(null, "auth-token", user.token, {
        path: "/",
        sameSite: "strict",
        maxAge: 3 * 24 * 60 * 60, // expires in 3 days
      });
      setIsLoading(false);
    }
  };

  return { signIn, isLoading, error };
};
