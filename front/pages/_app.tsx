import "@/styles/globals.scss";
import type { AppProps } from "next/app";
import Head from "next/head";
import { useRouter } from "next/router";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const excludedPaths = ["/404", "/pay"];

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title> Зелений світ - Магазин добрив і зоотоварів</title>
      </Head>
      {/* <AuthContextProvider> */}
      {/* {!excludedPaths.includes(router.pathname) && <Navbar />} */}
      <Component {...pageProps} />
      {/* {!excludedPaths.includes(router.pathname) && <Footer />} */}
      {/* </AuthContextProvider> */}
    </>
  );
}
