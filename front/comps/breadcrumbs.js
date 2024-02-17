import s from "./breadcrumbs.module.scss";
import Link from "next/link";
import { v4 as uuidv4 } from "uuid";
import { slugify } from "root/utils/slugify";
import { transliterate } from "root/utils/transliterate";
import { useDispatch, useSelector } from "react-redux";
import { useFindCategoryByPath } from "../hooks/useFindCategoryByPath";

const Breadcrumbs = ({ category }) => {
  const categoryPathArray = category.path.split(",");
  const { categories: allCategories } = useSelector(
    (state) => state.categories
  );

  const { findCategoryByPath } = useFindCategoryByPath();

  function getClickedCategory(pathElementIdx) {
    const path = categoryPathArray.slice(0, pathElementIdx + 1).join(",");
    console.log(path);
    if (path != category.path) {
      const category = findCategoryByPath(path, allCategories);

      if (typeof window !== "undefined") {
        localStorage.setItem("category", JSON.stringify(category));
      }
      return category;
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
            const SlugPathElement = `/products/${slugify(
              transliterate(array.slice(0, index + 1).join("-"))
            )}`;
            console.log(SlugPathElement);

            return (
              <li
                className={`breadcrumb-item ${
                  index === array.length - 1 ? "active" : ""
                }`}
                key={uuidv4()}
              >
                <Link
                  className="link"
                  href={{
                    pathname: SlugPathElement,
                    query: {
                      category: JSON.stringify(getClickedCategory(index)),
                    },
                  }}
                  as={SlugPathElement}
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
