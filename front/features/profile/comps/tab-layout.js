import Link from "next/link";

import { useSignOut } from "hooks/useSingOut";

import s from "./tab-layout.module.scss";

const TabLayout = ({ children }) => {
  const { signOut } = useSignOut();

  const handleSignOut = (e) => {
    // window.location.reload(true);
    console.log("sign out");
    signOut();
  };

  return (
    <div className={`${s.profile_tabs_layout}  `}>
      <TabMenu handleSignOut={handleSignOut} />
      <div className="w-100 h-100">{children}</div>
    </div>
  );
};

const TabMenu = ({ handleSignOut }) => {
  return (
    <nav className={`nav ${s.tabs}`}>
      <Tab
        href="/profile/personal_data"
        text="Personal Data"
        icon={<i className="bi bi-person-circle"></i>}
      />
      <Tab
        href="/profile/wish_list"
        text="Wish List"
        icon={<i className="bi bi-heart-fill"></i>}
      />
      <Tab
        href="/profile/orders_list"
        text="My orders"
        icon={<i className="bi bi-list-check"></i>}
      />
      <div className="w-20"></div>
      <Tab
        onClick={handleSignOut}
        href="/api/auth/signout"
        text="Sign Out"
        icon={<i className="bi bi-box-arrow-left"></i>}
      />
    </nav>
  );
};

const Tab = ({ text, icon, href, onClick }) => {
  return (
    <Link className={`${s.tab}`} href={href} onClick={onClick}>
      <div className={s.fill}>
        {icon}
        <p>{text}</p>
      </div>
    </Link>
  );
};

export default TabLayout;
