import axios from "axios";
import { setCookie } from "nookies";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { signIn } from "store/userSlice";

export const useSignUp = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const dispatch = useDispatch();

  const signUp = async (firstName, secondName, email, password) => {
    setIsLoading(true);
    setError(false);

    try {
      const response = await axios.post(`/user/signUp`, {
        firstName,
        secondName,
        email,
        password,
      });

      localStorage.setItem("user", JSON.stringify(response.data));
      dispatch(signIn(response.data));
      setCookie(null, "auth-token", response.data.token, {
        path: "/",
        sameSite: "strict",
        maxAge: 3 * 24 * 60 * 60, // expires in 3 days
      });
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setError(error.response.data.error);
    }
  };

  return { signUp, isLoading, error };
};
