import Link from "next/link";

import s from "./nav_item.module.scss";

const NavItem = ({ href, text, onClick, children }) => {
  return (
    <li
      className={`nav-item ${s.nav_item}`}
      data-bs-dismiss="offcanvas"
      onClick={onClick}
    >
      <Link href={href}>
        {children}
        <p>{text}</p>
      </Link>
    </li>
  );
};

export default NavItem;
