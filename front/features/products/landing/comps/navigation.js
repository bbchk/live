import Link from "next/link";
import { useRouter } from "next/router";
import s from "./navigation.module.scss";

const Navigation = ({ activePage, productSlug }) => {
  const router = useRouter();

  return (
    <>
      <ul className={`nav nav-underline mt-4 ${s.navigation}`}>
        <div className={`${s.decor_line}`}></div>
        <li className={`nav-item ms-5 ${s.link_container}`}>
          <Link
            className={`nav-link ${s.link}  ${
              activePage === "about" ? s.active : ""
            }`}
            aria-current="page"
            href={`/products/${router.query.categories}/${productSlug}/about`}
          >
            Усе про товар
          </Link>
        </li>
        <li className={`nav-item ${s.link_container}`}>
          <Link
            className={`nav-link ${s.link} ${
              activePage === "characteristics" ? s.active : ""
            }`}
            href={`/products/${router.query.categories}/${productSlug}/characteristics`}
          >
            Характеристики
          </Link>
        </li>
        {/* <li className={`nav-item ${s.link_container}`}>
          <Link
            className={`nav-link ${s.link} ${
              activePage === "reviews" ? "active" : ""
            }`}
            href={`/products/${router.query.categories}/${productSlug}/reviews`}
          >
            Відгуки
          </Link>
        </li> */}
      </ul>
    </>
  );
};

export default Navigation;
