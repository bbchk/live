import Link from "next/link";
import s from "./logo.module.scss";

const Logo = () => {
  return (
    <Link className={`${s.logo} navbar-brand`} href="/">
      <i className={`bi bi-flower1 ${s.icon}`}></i>
      <p className={`${s.brand}`}>Живий світ</p>
    </Link>
  );
};

export default Logo;
