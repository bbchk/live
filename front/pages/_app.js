import "root/styles/globals.scss";
import Head from "next/head";
import { useRouter } from "next/router";
import axios from "axios";
axios.defaults.baseURL = "http://localhost:4000";

import { useState, useEffect } from "react";

import Header from "root/comps/layout/header/header";
import Footer from "root/comps/layout/footer/footer";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import dotenv from "dotenv";
import { Provider } from "react-redux";
import { store } from "root/store/store";
import { useDispatch } from "react-redux";

import { getProductsInfo } from "root/store/productsSlice";
import { getCategoriesInfo } from "root/store/categoriesSlice";

dotenv.config();

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
        <title> Зелений світ - Магазин добрив і зоотоварів</title>
      </Head>
      <Provider store={store}>
        {!excludedPaths.includes(router.pathname) && <Header />}
        <FetchData />
        <Component {...pageProps} />
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
