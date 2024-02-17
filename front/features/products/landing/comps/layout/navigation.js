import Link from "next/link";
import { useRouter } from "next/router";
import s from "./navigation.module.scss";

import { slugify } from "root/utils/slugify";
import { transliterate } from "root/utils/transliterate";

const Navigation = ({ activePage, category, product }) => {
  const router = useRouter();

  const { categories: activeCategoryPath } = router.query;

  const productUrl = `/products/${activeCategoryPath}/${slugify(
    transliterate(product.name)
  )}`;

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
            href={{
              pathname: `${productUrl}/about`,
              query: {
                category: JSON.stringify(category),
                product: JSON.stringify(product),
              },
            }}
            as={`${productUrl}/about`}
          >
            Усе про товар
          </Link>
        </li>
        <li className={`nav-item ${s.link_container}`}>
          <Link
            className={`nav-link ${s.link} ${
              activePage === "characteristics" ? s.active : ""
            }`}
            href={{
              pathname: `${productUrl}/characteristics`,
              query: {
                category: JSON.stringify(category),
                product: JSON.stringify(product),
              },
            }}
            as={`${productUrl}/characteristics`}
          >
            Характеристики
          </Link>
        </li>
        {/* <li className={`nav-item ${s.link_container}`}>
          <Link
            className={`nav-link ${s.link} ${
              activePage === "reviews" ? "active" : ""
            }`}
            href={`/products/${router.query.categories}/${productNameSlug}/reviews`}
          >
            Відгуки
          </Link>
        </li> */}
      </ul>
    </>
  );
};

export default Navigation;
