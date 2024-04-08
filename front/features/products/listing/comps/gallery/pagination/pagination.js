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

//todo refactoring
function ProductsPagination({ numPages, activePageId }) {
  // numPages = 100;
  const dispatch = useDispatch();

  const router = useRouter();
  const { categoryPath } = router.query;
  const getPath = (pageId) => `/products/${categoryPath}/page=${pageId}`;

  const isActive = (pageId) => pageId == activePageId;

  const PaginationItem = ({ pageId, onClick, children }) => {
    return (
      <Link
        href={getPath(pageId)}
        onClick={(event) => {
          if (isActive(pageId) || pageId == undefined) {
            event.preventDefault();
          } else {
            if (onClick) onClick();
            dispatch(startLoading());
          }
        }}
      >
        <li className={`${s.item} ${isActive(pageId) ? s.active : ""}`}>
          {children}
        </li>
      </Link>
    );
  };

  const [currentPage, setCurrentPage] = useState(activePageId);
  const maxPageItems = 5;

  let startPage = Math.max(1, currentPage - Math.floor(maxPageItems / 2));
  let endPage = Math.min(numPages, startPage + maxPageItems - 1);

  if (endPage - startPage + 1 < maxPageItems) {
    startPage = Math.max(1, endPage - maxPageItems + 1);
  }

  const pageItems = [];
  for (let i = startPage; i <= endPage; i++) {
    pageItems.push(
      <PaginationItem key={i} pageId={i}>
        <p>{i}</p>
      </PaginationItem>
    );
  }

  if (startPage > 1) {
    pageItems.unshift(
      <PaginationItem
        key={"left_elipsis"}
        pageId={startPage - 1}
        onClick={() => setCurrentPage(startPage - 1)}
      >
        ...
      </PaginationItem>
    );
  }

  if (endPage < numPages) {
    pageItems.push(
      <PaginationItem
        key={"right_elipsis"}
        pageId={endPage + 1}
        onClick={() => setCurrentPage(endPage + 1)}
      >
        ...
      </PaginationItem>
    );
  }

  return (
    <nav aria-label="pagination">
      <ul className={`${s.pagination}`}>
        <ul className={`${s.controls} ${isActive(1) ? s.disabled : ""}`}>
          <PaginationItem pageId={1}>
            <FontAwesomeIcon icon={faAnglesLeft} />
          </PaginationItem>
          <PaginationItem pageId={Math.max(1, Number(activePageId) - 1)}>
            <FontAwesomeIcon icon={faAngleLeft} />
          </PaginationItem>
        </ul>

        <ul className={`${s.pages}`}>{pageItems}</ul>
        <li className={`${s.pages}`}>
          Сторінка {activePageId} з {numPages}
        </li>
        <ul className={`${s.controls} ${isActive(numPages) ? s.disabled : ""}`}>
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
