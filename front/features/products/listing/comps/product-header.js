import { useEffect, useState } from "react";
import s from "./product-header.module.scss";
import Link from "next/link";
import { v4 as uuidv4 } from "uuid";
import Breadcrumbs from "root/comps/breadcrumbs";

const ProductHeader = ({ category }) => {
  return (
    <>
      <div className={`${s.product_header}`}>
        <Breadcrumbs category={category} />
      </div>
    </>
  );
};

export default ProductHeader;
