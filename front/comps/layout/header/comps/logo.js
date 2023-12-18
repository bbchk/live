import Link from "next/link";
import s from "./logo.module.scss";

const Logo = () => {
  return (
    <Link className={`${s.logo} navbar-brand`} href="/">
      <div className="d-flex align-items-center gap-3">
        <p className={`${s.brand}`}>Live World</p>
      </div>
    </Link>
  );
};

export default Logo;
