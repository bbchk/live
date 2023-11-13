import { useEffect, useState } from "react";
import s from "./product-header.module.scss";
import Link from "next/link";

const ProductHeader = ({ category }) => {
  return (
    <>
      <div className={`${s.product_header}`}>
        <nav className={`${s.breadcrumbs}`} aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className={`breadcrumb-item `}>
              <Link href="/">
                <i class="bi bi-house-fill"></i>
              </Link>
            </li>
            {category.path.split(",").map((pathElement, index, array) => {
              return (
                <li
                  className={`breadcrumb-item ${
                    index === array.length - 1 ? "active" : ""
                  }`}
                >
                  <Link href={`/products/${pathElement}`}>{pathElement}</Link>
                </li>
              );
            })}
          </ol>
        </nav>
      </div>
    </>
  );
};

export default ProductHeader;
