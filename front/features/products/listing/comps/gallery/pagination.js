import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {  } from "@fortawesome/free-regular-svg-icons";
import {
  faAnglesLeft,
  faAnglesRight,
  faAngleLeft,
  faAngleRight,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

import s from "./pagination.module.scss";
import { startLoading } from "store/modalSlice";
import { useDispatch } from "react-redux";
import { useState } from "react";

function ProductsPagination({ numPages, activePageId }) {
  // numPages = Number(100);
  const dispatch = useDispatch();
  const router = useRouter();
  const { categoryPath } = router.query;
  const getPath = (pageId) => `/products/${categoryPath}/page=${pageId}`;

  //todo if pageId > numPages give 404
  //todo if pageId == activePageId does do anything
  const PaginationItem = ({ pageId, children }) => {
    const isActive = pageId == activePageId;

    return (
      <Link
        href={getPath(pageId)}
        onClick={(event) => {
          if (isActive) {
            event.preventDefault();
          } else {
            dispatch(startLoading());
          }
        }}
      >
        <li className={`${s.item} ${isActive ? s.active : ""}`}>{children}</li>
      </Link>
    );
  };

  return (
    <nav aria-label="Page navigation example">
      <ul className={`${s.pagination}`}>
        <ul className={`${s.controls} ${activePageId == 1 ? s.disabled : ""}`}>
          <PaginationItem pageId={1}>
            <FontAwesomeIcon icon={faAnglesLeft} />
          </PaginationItem>
          <PaginationItem pageId={Math.max(1, Number(activePageId) - 1)}>
            <FontAwesomeIcon icon={faAngleLeft} />
          </PaginationItem>
        </ul>

        <ul className={`${s.pages}`}>
          {Array.from({ length: numPages }, (_, i) => i + 1).map((pageId) => {
            return (
              <PaginationItem key={pageId} pageId={pageId}>
                <p>{pageId}</p>
              </PaginationItem>
            );
          })}
        </ul>
        <ul
          className={`${s.controls} ${
            activePageId == numPages ? s.disabled : ""
          }`}
        >
          <PaginationItem pageId={Math.max(1, Number(activePageId) + 1)}>
            <FontAwesomeIcon icon={faAngleRight} />
          </PaginationItem>
          <PaginationItem pageId={numPages}>
            <FontAwesomeIcon icon={faAnglesRight} />
          </PaginationItem>
        </ul>
      </ul>
    </nav>
  );
}

export default ProductsPagination;
