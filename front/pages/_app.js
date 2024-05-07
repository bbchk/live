import "styles/globals.scss";
import Head from "next/head";
import Script from "next/script";

import axios from "axios";
axios.defaults.baseURL = process.env.NEXT_PUBLIC_BACKEND_URL;

// Import the styles manually to prevent a Font Awesome icon server-side rendering bug
import "@fortawesome/fontawesome-svg-core/styles.css";
// Prevent fontawesome from adding its CSS since we did it manually above
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;

import { SessionProvider, getSession } from "next-auth/react";
import { signIn } from "store/userSlice";

import React, { useState, useEffect, Suspense } from "react";

import { lazy } from "react";

const ChangePasswordModal = lazy(() =>
  import("comps/modals/change_password/change_password_modal")
);
const SignInModal = lazy(() =>
  import("comps/modals/auth/sign_in_modal/sign_in_modal")
);
const SignUpModal = lazy(() =>
  import("comps/modals/auth/sign_up_modal/sign_up_modal")
);
const DeleteAccountModal = lazy(() =>
  import("comps/modals/delete_account/delete_account_modal.js")
);
const CartModal = lazy(() => import("comps/modals/cart/cart_modal"));
const WriteReviewModal = lazy(() =>
  import("comps/modals/reviews/write_review_modal")
);

import Header from "comps/layout/header/header";

const Footer = lazy(() => import("comps/layout/footer/footer"));

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

import { enableMapSet } from "immer";
enableMapSet();

import { Provider } from "react-redux";
import { store } from "store/store";
import { useSelector } from "react-redux";

import { Balsamiq_Sans } from "next/font/google";
import { Pacifico } from "next/font/google";

const balsamiqSans = Balsamiq_Sans({ weight: "400", subsets: ["latin"] });
const pacifico = Pacifico({ weight: "400", subsets: ["latin"] });
export { balsamiqSans, pacifico };

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  useEffect(() => {
    const Bootstrap = require("bootstrap/dist/js/bootstrap");
    const Popper = require("@popperjs/core");
  }, []);
  return (
    <div>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title> Живий світ: Магазин зоотоварів і товарів для дому </title>
        <meta
          name="description"
          content="Живий Світ: Магазин найкращих товарів для вашого дому, домашніх улюбленців та рослин"
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
      <Script
        src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p"
        crossorigin="anonymous"
      ></Script>
    </div>
  );
}

const Body = ({ children }) => {
  const { loading } = useSelector((state) => state.modals);

  return (
    <div className={`min-vh-65 ${balsamiqSans.className}`}>
      <div className={`loading_overlay ${loading ? "show" : ""} `} />

      <Modals />
      {children}
    </div>
  );
};

function Modals() {
  return (
    <>
      <Suspense fallback={<></>}>
        <DeleteAccountModal />
        <ChangePasswordModal />
        <SignInModal />
        <SignUpModal />
        <CartModal />
        <WriteReviewModal />
      </Suspense>
    </>
  );
}
