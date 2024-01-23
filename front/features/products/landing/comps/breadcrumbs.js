import s from "./breadcrumbs.module.scss";
import Link from "next/link";
import { v4 as uuidv4 } from "uuid";

const Breadcrumbs = ({ category }) => {
  return (
    <>
      <nav className={`${s.breadcrumbs} mt-3`} aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className={`breadcrumb-item ms-5`}>
            <Link className="link" href="/">
              <p>Головна</p>
            </Link>
          </li>
          {/* {category.path.split(",").map((pathElement, index, array) => {
            return (
              <li
                className={`breadcrumb-item ${
                  index === array.length - 1 ? "active" : ""
                }`}
                key={uuidv4()}
              >
                <Link className="link" href={`/products/${pathElement}`}>
                  {pathElement}
                </Link>
              </li>
            );
          })} */}
        </ol>
      </nav>
    </>
  );
};

export default Breadcrumbs;
