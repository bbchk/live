import Link from "next/link";
import s from "./tab.module.scss";

const Tab = ({ children, href }) => {
  return (
    <li className={`${s.tab}`}>
      <Link className={`${s.content}`} href={href}>
        {children}
      </Link>
    </li>
  );
};

export default Tab;
