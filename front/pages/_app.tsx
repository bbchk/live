import { useDispatch } from "react-redux";
import { SET_PRODUCTS } from "root/actions/setProduct";
import "root/styles/globals.scss";
import type { AppProps } from "next/app";
import Head from "next/head";
import { useRouter } from "next/router";

import Header from "root/comps/layout/header/header";
import Footer from "root/comps/layout/footer/footer";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { AuthContextProvider } from "root/context/authContext";
import { CategoryContextProvider } from "root/context/categoryContext";

import { useEffect } from "react";
import dotenv from "dotenv";
import { Provider } from "react-redux";
import store from "root/store";
import { ProductContextProvider } from "root/context/productContext";

dotenv.config();

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const excludedPaths = ["/404", "/pay"];

  useEffect(() => {
    if (typeof window !== "undefined") {
      require("bootstrap/dist/js/bootstrap");
    }
  }, []);

  return (
    <div>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title> Зелений світ - Магазин добрив і зоотоварів</title>
      </Head>
      <Provider store={store}>
        <CategoryContextProvider>
          <AuthContextProvider>
            {!excludedPaths.includes(router.pathname) && <Header />}
            <Component {...pageProps} />
            {!excludedPaths.includes(router.pathname) && <Footer />}
          </AuthContextProvider>
        </CategoryContextProvider>
      </Provider>
    </div>
  );
}
