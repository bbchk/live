import { useRouter } from "next/router";
import { destroyCookie } from "nookies";
import { useAuthContext } from "./useAuthContext";

export const useSignOut = () => {
  const { dispatch } = useAuthContext();
  const router = useRouter();
  const signOut = async () => {
    localStorage.removeItem("user");
    dispatch({ type: "SIGN_OUT" });
    await destroyCookie(null, "auth-token", {
      path: "/",
      sameSite: "strict",
      maxAge: 0,
    });
    router.push("/");
  };

  return { signOut };
};
