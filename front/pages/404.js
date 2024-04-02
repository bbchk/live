import Head from "next/head";
import React from "react";
import NotFound from "comps/layout/404";

export default function Custom404() {
  return (
    <>
      <Head>
        <title> Живий світ | Сторінку не знайдено </title>
        <meta name="description" content="Живий Світ | Cторінку не знайдено" />
      </Head>

      <NotFound />
    </>
  );
}
