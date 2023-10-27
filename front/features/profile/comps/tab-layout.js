import Link from "next/link";

import { useSignOut } from "@/hooks/useSingOut";

import s from "./tab-layout.module.scss";

const TabLayout = ({ children }) => {
  const { signOut } = useSignOut();

  const handleSignOut = (e) => {
    window.location.reload(true);
    signOut();
  };

  return (
    <div className={`${s.profile_frame}  `}>
      <div className={`${s.sections} `}>
        <nav className="nav flex-column ">
          <Link
            className="nav-link active icon-link"
            aria-current="page"
            href="/profile/personal_data"
          >
            <i className="bi bi-person-lines-fill"></i>
            <p>Особисті дані</p>
          </Link>
          <Link className="nav-link icon-link" href="/profile/wish_list">
            <i className="bi bi-heart-fill"></i>
            <p>Список бажань</p>
          </Link>
          <Link className="nav-link icon-link" href="/profile/orders_list">
            <i className="bi bi-list-check"></i>
            <p>Мої замовлення</p>
          </Link>
          <div className="text-center mt-3">
            <Link
              onClick={handleSignOut}
              className={`nav-link icon-link`}
              href="/"
            >
              <p>Вийти</p>
              <i className="bi bi-box-arrow-right "></i>
            </Link>
          </div>
        </nav>
      </div>
      <div className="w-100 h-100">{children}</div>
    </div>
  );
};

export default TabLayout;
