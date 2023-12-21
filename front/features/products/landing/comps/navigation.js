import Link from "next/link";
import { useRouter } from "next/router";

const Navigation = ({ activePage, productId }) => {
  const router = useRouter();

  return (
    <>
      <ul className="nav nav-underline ">
        <li className="nav-item ms-5 ">
          <Link
            className={`nav-link ${activePage === "about" ? "active" : ""}`}
            aria-current="page"
            href={`/products/${router.query.categories}/${productId}/about`}
          >
            All about the product
          </Link>
        </li>
        <li className="nav-item">
          <Link
            className={`nav-link ${
              activePage === "characteristics" ? "active" : ""
            }`}
            href={`/products/${router.query.categories}/${productId}/characteristics`}
          >
            Characteristics
          </Link>
        </li>
        <li className="nav-item">
          <Link
            className={`nav-link ${activePage === "reviews" ? "active" : ""}`}
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
