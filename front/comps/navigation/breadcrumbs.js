import s from "./breadcrumbs.module.scss";
import Link from "next/link";
import { slugify } from "@bbuukk/slugtrans/slugify";
import { transliterate } from "@bbuukk/slugtrans/transliterate";
import { useSelector, useDispatch } from "react-redux";
import { deleteAllFilters } from "store/filtersSlice";

import { startLoading } from "store/modalSlice";

const Breadcrumbs = ({ category }) => {
  const dispatch = useDispatch();
  const { categories: allCategories } = useSelector(
    (state) => state.categories
  );

  return (
    <>
      <nav
        className={`${s.breadcrumbs}`}
        aria-label="Category path breadcrumbs"
      >
        <ol className="breadcrumb">
          <li className={`breadcrumb-item`}>
            <Link href="/">Головна</Link>
          </li>

          {allCategories &&
            category.path.split(",").map((pathPart, index, pathParts) => {
              const clickedCategoryIndex = index + 1;
              const clickedCategoryPath = pathParts
                .slice(0, clickedCategoryIndex)
                .join(",");
              const categoryPathSlug = slugify(
                transliterate(clickedCategoryPath)
              );

              const isActiveCategory = index === pathParts.length - 1;
              return (
                <li
                  className={`breadcrumb-item ${s.item} ${
                    isActiveCategory ? "active" : ""
                  }`}
                  key={pathPart}
                >
                  <Link
                    href={`/products/${categoryPathSlug}/page=1`}
                    onClick={() => {
                      dispatch(startLoading());
                      dispatch(deleteAllFilters());
                    }}
                  >
                    {pathPart}
                  </Link>
                </li>
              );
            })}
        </ol>
      </nav>
    </>
  );
};

export default Breadcrumbs;
