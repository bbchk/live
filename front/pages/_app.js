import "styles/globals.scss";
import Head from "next/head";
import { useRouter } from "next/router";
import axios from "axios";

axios.defaults.baseURL = process.env.NEXT_PUBLIC_BACKEND_URL;

import { SessionProvider, getSession } from "next-auth/react";
import { setCart } from "store/userSlice";

import React, { useState, useEffect } from "react";

import ChangePasswordModal from "comps/modals/change_password/change_password_modal";
import SignInModal from "comps/modals/auth/sign_in_modal/sign_in_modal";
import SignUpModal from "comps/modals/auth/sign_up_modal/sign_up_modal";
import DeleteAccountModal from "comps/modals/delete_account/delete_account_modal.js";
import CartModal from "comps/modals/cart/cart_modal";
import WriteReviewModal from "comps/modals/reviews/write_review_modal";

import Header from "comps/layout/header/header";
import Footer from "comps/layout/footer/footer";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

import { enableMapSet } from "immer";

// Call this before using Redux Toolkit or Immer
enableMapSet();

import { Provider } from "react-redux";
import { store } from "store/store";
import { useDispatch, useSelector } from "react-redux";

import { getProductsInfo } from "store/productsSlice";
import { getCategoriesInfo } from "store/categoriesSlice";

import { useCart } from "hooks/useCart";

import { Balsamiq_Sans } from "next/font/google";
import { Pacifico } from "next/font/google";
import { toggleLoading } from "#root/store/modalSlice.js";
const balsamiqSans = Balsamiq_Sans({ weight: "400", subsets: ["latin"] });
const pacifico = Pacifico({ weight: "400", subsets: ["latin"] });
export { balsamiqSans, pacifico };

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  const router = useRouter();
  const excludedPaths = ["/404", "/pay"];

  useEffect(() => {
    if (typeof window !== "undefined") {
      require("bootstrap/dist/js/bootstrap");
      require("@popperjs/core");
    }
  }, []);

  return (
    <div>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title> Живий світ - Магазин зоотоварів і товарів для дому </title>
        <meta
          name="description"
          content="Живий Світ - Магазин найкращих товарів для вашого дому, домашніх улюбленців та рослин"
        />
      </Head>
      <SessionProvider session={session}>
        <Provider store={store}>
          <Header />
          <Body>
            <Component {...pageProps} />
          </Body>
          <Footer />
        </Provider>
      </SessionProvider>
    </div>
  );
}
const Body = ({ children }) => {
  const { loading } = useSelector((state) => state.modals);

  return (
    <div className={`min-vh-65 ${balsamiqSans.className}`}>
      <div className={`loading_overlay ${loading ? "show" : ""} `}>
        {/* <div className="loader" /> */}
      </div>

      <FetchData />
      <Modals />
      {children}
    </div>
  );
};

//? todo unefficient
//todo it loads all the products on the first render or rerender of this component
function FetchData() {
  const dispatch = useDispatch();
  const [fetched, setFetched] = useState(false);

  const { getCart } = useCart();

  useEffect(() => {
    if (!fetched) {
      dispatch(getProductsInfo());
      dispatch(getCategoriesInfo());

      async function getUserCart() {
        const session = await getSession();

        const cart = await getCart(session);
        dispatch(setCart(cart));
      }
      getUserCart();
      setFetched(true);
    }
  }, [dispatch, fetched]);

  return null;
}

function Modals() {
  return (
    <>
      <DeleteAccountModal />
      <ChangePasswordModal />
      <SignInModal />
      <SignUpModal />
      <CartModal />
      <WriteReviewModal />
    </>
  );
}
