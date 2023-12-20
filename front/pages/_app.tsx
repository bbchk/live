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
import { ProductContextProvider } from "root/context/productContext";
import { useProductContext } from "../hooks/useProductContext";
import { useCategoryContext } from "../hooks/useCategoryContext";
import { useEffect } from "react";
import dotenv from "dotenv";
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
      <ProductContextProvider>
        <CategoryContextProvider>
          <AuthContextProvider>
            {!excludedPaths.includes(router.pathname) && <Header />}
            <Component {...pageProps} />
            {!excludedPaths.includes(router.pathname) && <Footer />}
          </AuthContextProvider>
        </CategoryContextProvider>
      </ProductContextProvider>
    </div>
  );
}
