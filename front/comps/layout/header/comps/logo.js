import Link from "next/link";
import s from "./logo.module.scss";

const Logo = () => {
  return (
    <Link className={`${s.logo} navbar-brand`} href="/">
      <div className="d-flex align-items-center">
        {/* <i className={`bi bi-flower1 ${s.icon}`}></i> */}
        <p className={`${s.brand}`}>Live World</p>
      </div>
    </Link>
  );
};

export default Logo;
