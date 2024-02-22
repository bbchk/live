import "styles/globals.scss";
import Head from "next/head";
import { useRouter } from "next/router";
import axios from "axios";
axios.defaults.baseURL = "http://localhost:4000";

import React, { useState, useEffect } from "react";

import Header from "comps/layout/header/header";
import Footer from "comps/layout/footer/footer";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

import { Provider } from "react-redux";
import { store } from "store/store";
import { useDispatch } from "react-redux";

import { getProductsInfo } from "store/productsSlice";
import { getCategoriesInfo } from "store/categoriesSlice";

export default function App({ Component, pageProps }) {
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
        //todo write pretty title
        <title> Живий світ - Магазин зоотоварів і товарів для дому </title>
        //todo write pretty description
        <meta
          name="description"
          content="Explore our wide range of products including books, electronics, and clothing."
        />
      </Head>
      <Provider store={store}>
        <div className="min-vh-80 mb-3">
          {!excludedPaths.includes(router.pathname) && <Header />}
          <FetchData />
          <Component {...pageProps} />
        </div>
        {!excludedPaths.includes(router.pathname) && <Footer />}
      </Provider>
    </div>
  );
}

//todo unefficient
//todo it loads all the products on the first render or rerender of this component
function FetchData() {
  const dispatch = useDispatch();
  const [fetched, setFetched] = useState(false);

  useEffect(() => {
    if (!fetched) {
      dispatch(getProductsInfo());
      dispatch(getCategoriesInfo());
      setFetched(true);
    }
  }, [dispatch, fetched]);

  return null;
}
