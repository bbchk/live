import s from "./breadcrumbs.module.scss";
import Link from "next/link";
import { v4 as uuidv4 } from "uuid";
import { makeSlug } from "root/utils/slugify";
import { useDispatch, useSelector } from "react-redux";
import { setActiveCategory } from "root/store/categoriesSlice";
import { useFindCategoryByPath } from "../hooks/useFindCategoryByPath";

const Breadcrumbs = ({ activeCategory }) => {
  const dispatch = useDispatch();

  const categoryPathArray = activeCategory.path.split(",");
  const { categories: allCategories } = useSelector(
    (state) => state.categories
  );

  const { findCategoryByPath } = useFindCategoryByPath();
  function saveActiveCategory(pathElementIdx) {
    const path = categoryPathArray.slice(0, pathElementIdx + 1).join(",");
    if (path != activeCategory.path) {
      const category = findCategoryByPath(path, allCategories);

      if (typeof window !== "undefined") {
        localStorage.setItem("activeCategory", JSON.stringify(category));
      }
      dispatch(setActiveCategory(category));
    }
  }

  return (
    <>
      <nav className={`${s.breadcrumbs} mt-3`} aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className={`breadcrumb-item ms-5`}>
            <Link className="link" href="/">
              <p>Головна</p>
            </Link>
          </li>
          {categoryPathArray.map((pathElement, index, array) => {
            const SlugPathElement = `/products/${makeSlug(
              array.slice(0, index + 1).join("-")
            )}`;
            return (
              <li
                className={`breadcrumb-item ${
                  index === array.length - 1 ? "active" : ""
                }`}
                key={uuidv4()}
              >
                <Link
                  className="link"
                  href={SlugPathElement}
                  onClick={() => saveActiveCategory(index)}
                >
                  {pathElement}
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
