import { useState } from "react";
import s from "./header.module.scss";

import SignInModal from "../../../features/authentication/comps/auth/sign_in_modal";
import SignUpModal from "../../../features/authentication/comps/auth/sign_up_modal";
import Logo from "./comps/logo";
import ProfilePopover from "./comps/profile_popover";
import SearchBar from "./comps/search-bar";

const Header = () => {
  const [showSignInModal, setShowSignInModal] = useState(false);
  const [showSignUpModal, setShowSignUpModal] = useState(false);
  // const [showShoppingCartModal, setShowShoppingCartModal] = useState(false);

  return (
    <nav className={`navbar navbar-expand-sm ${s.navbar_container}`}>
      <div className={` ${s.navbar}`}>
        <div className={`${s.logo_container}`}>
          <Logo />
        </div>
        <button
          className={`navbar-toggler ${s.navbar_toggler}`}
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <i className="bi bi-search fs-4"></i>
        </button>

        <div className={`order-sm-2 ${s.profile_popover}`}>
          <ProfilePopover
            toggleSignInModal={() => setShowSignInModal(!showSignInModal)}
            toggleSignUpModal={() => setShowSignUpModal(!showSignUpModal)}
          />
        </div>
        {/* <div className={`order-sm-3 ${s.shopping_cart_button}`}>
          <ShoppingCartButton
            toggle={() => setShowShoppingCartModal(!showShoppingCartModal)}
          />
        </div> */}

        <div
          className={`${s.search_bar_container} collapse navbar-collapse order-sm-1`}
          id="navbarSupportedContent"
        >
          <SearchBar />
        </div>
      </div>
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
      {/* <ShoppingCartModal
        isOpen={showShoppingCartModal}
        toggle={() => {
          setShowShoppingCartModal(!showShoppingCartModal);
        }}
      /> */}
    </nav>
  );
};

export default Header;
