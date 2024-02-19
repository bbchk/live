import Link from "next/link";
import { useRouter } from "next/router";
import s from "./navigation.module.scss";

import { slugify } from "@bbuukk/slugtrans/slugify";
import { transliterate } from "@bbuukk/slugtrans/transliterate";

const Navigation = ({ activePage, category, product }) => {
  const router = useRouter();
  console.log(product);

  const { categories: activeCategoryPath, pageId } = router.query;

  const productUrl = `/products/${activeCategoryPath}/page/${pageId}/${slugify(
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
                productObjectId: product._id,
              },
            }}
            // as={`${productUrl}/about`}
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
                productObjectId: product._id,
              },
            }}
            // as={`${productUrl}/characteristics`}
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
