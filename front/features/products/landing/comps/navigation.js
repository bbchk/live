import Link from "next/link";

const Navigation = ({ activePage , productId}) => {
    return (<><ul className="nav nav-underline">
    <li className="nav-item">
      <Link className={`nav-link ${activePage === 'about' ? 'active' : ''}`} aria-current="page" href={`/products/${productId}/about`}>All about the product</Link>
    </li>
    <li className="nav-item">
      <Link className={`nav-link ${activePage === 'characteristics' ? 'active' : ''}`} href={`/products/${productId}/characteristics`}>Characteristics</Link>
    </li>
    <li className="nav-item">
      <Link className={`nav-link ${activePage === 'reviews' ? 'active' : ''}`} href={`/products/${productId}/reviews`}>Reviews</Link>
    </li>
  </ul></>)
}

export default Navigation;