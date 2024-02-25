import { useState } from "react";
import s from "./header.module.scss";
import SignInModal from "../../../features/authentication/comps/auth/sign_in_modal";
import SignUpModal from "../../../features/authentication/comps/auth/sign_up_modal";

import SignInPopOver from "./comps/sign_in_popover";
import SearchBar from "./comps/search-bar";
import { useSelector } from "react-redux";
import Link from "next/link";
import { CustomTooltip } from "comps/tooltip";
import { useSession, signIn, signOut } from "next-auth/react";

const Header = () => {
  // const { data: session } = useSession();
  const { user } = useSelector((state) => state.user);

  const [showSignInModal, setShowSignInModal] = useState(false);
  const [showSignUpModal, setShowSignUpModal] = useState(false);

  return (
    <>
      <nav className={`navbar navbar-expand-sm ${s.header}`}>
        <Link className={`${s.logo} navbar-brand`} href="/">
          Живий світ
        </Link>
        {/* <Link href="#" onClick={() => signIn()}>
          nextauth
        </Link> */}
        <SearchBar />
        {!user && (
          <SignInPopOver
            toggleSignInModal={() => setShowSignInModal(!showSignInModal)}
            toggleSignUpModal={() => setShowSignUpModal(!showSignUpModal)}
          />
        )}
        {user && <IconButtonGroup />}

        <SignInModal
          isOpen={showSignInModal}
          toggle={() => {
            setShowSignInModal(!showSignInModal);
          }}
          toggleSignUpModal={() => {
            setShowSignInModal(!showSignUpModal);
          }}
        />

        <SignUpModal
          isOpen={showSignUpModal}
          toggle={() => {
            setShowSignUpModal(!showSignUpModal);
          }}
          toggleSingInModal={() => {
            setShowSignInModal(!showSignInModal);
          }}
        />
      </nav>
      <div className={`${s.underline}`}></div>
    </>
  );
};

export default Header;

const IconButton = ({ href, children, tooltipText }) => {
  return (
    <CustomTooltip tooltipText={tooltipText}>
      <Link className={`btn ${s.icon_btn}`} href={href}>
        {children}
      </Link>
    </CustomTooltip>
  );
};

const IconButtonGroup = () => {
  return (
    <div className={`order-sm-2 ${s.icon_btn_group}`}>
      <IconButton
        href={"/profile/personal_data"}
        tooltipText={"Персональний кабінет"}
      >
        <i className={`bi bi-person-circle `} />
      </IconButton>
      <IconButton
        href={"/profile/orders_list"}
        tooltipText={"Список замовлень"}
      >
        <i className="bi bi-list-ul " />
      </IconButton>
      <IconButton href={"/profile/wish_list"} tooltipText={"Список бажаного"}>
        <i className="bi bi-heart-fill " />
      </IconButton>
      <IconButton href={"/profile/cart"} tooltipText={"Кошик покупок"}>
        <i className="bi bi-cart3 " />
      </IconButton>
    </div>
  );
};
