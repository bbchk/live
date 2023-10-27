import { setCookie } from "nookies";
import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useSignUp = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useAuthContext();

  const signUp = async (firstName, secondName, email, password) => {
    setIsLoading(true);
    setError(false);

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/user/signUp`,
      {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ firstName, secondName, email, password }),
      }
    );

    const json = await response.json();

    if (!response.ok) {
      setIsLoading(false);
      setError(json.error);
    } else {
      localStorage.setItem("user", JSON.stringify(json));
      dispatch({ type: "SIGN_IN", payload: json });
      setCookie(null, "auth-token", user.token, {
        path: "/",
        sameSite: "strict",
        maxAge: 3 * 24 * 60 * 60, // expires in 3 days
      });
      setIsLoading(false);
    }
  };

  return { signUp, isLoading, error };
};
