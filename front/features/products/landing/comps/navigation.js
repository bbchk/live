import Link from "next/link";
import { useRouter } from "next/router";
import s from "./navigation.module.scss";

const Navigation = ({ activePage, productId }) => {
  const router = useRouter();

  return (
    <>
      <ul className={`nav nav-underline mt-4 ${s.navigation}`}>
        <li className={`nav-item ms-5 ${s.link_container}`}>
          <Link
            className={`nav-link ${s.link}  ${
              activePage === "about" ? "active" : ""
            }`}
            aria-current="page"
            href={`/products/${router.query.categories}/${productId}/about`}
          >
            All about the product
          </Link>
        </li>
        <li className={`nav-item ${s.link_container}`}>
          <Link
            className={`nav-link ${s.link} ${
              activePage === "characteristics" ? "active" : ""
            }`}
            href={`/products/${router.query.categories}/${productId}/characteristics`}
          >
            Characteristics
          </Link>
        </li>
        <li className={`nav-item ${s.link_container}`}>
          <Link
            className={`nav-link ${s.link} ${
              activePage === "reviews" ? "active" : ""
            }`}
            href={`/products/${router.query.categories}/${productId}/reviews`}
          >
            Reviews
          </Link>
        </li>
      </ul>
    </>
  );
};

export default Navigation;
