import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";

import { toggleSignInModal } from "store/modalSlice";
import { useEffect, useRef } from "react";

const SignIn = () => {
  const router = useRouter();

  const dispatch = useDispatch();
  const { data: session } = useSession();

  useEffect(() => {
    if (!session) {
      dispatch(toggleSignInModal());
    } else {
      router.push("/profile/personal_data");
    }
  }, [session]);

  const { signInModalOpen, signUpModalOpen } = useSelector(
    (state) => state.modals
  );

  useEffect(() => {
    let timeoutId;
    if (!signInModalOpen && !signUpModalOpen) {
      timeoutId = setTimeout(() => {
        router.push("/");
      }, 200);
    }
    return () => {
      clearTimeout(timeoutId);
    };
  }, [signInModalOpen, signUpModalOpen, router]);

  return <></>;
};

export default SignIn;
