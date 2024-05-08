import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Popover from "react-bootstrap/Popover";
import { useDispatch } from "react-redux";

import { toggleSignInModal, toggleSignUpModal } from "store/modalSlice";
import { balsamiqSans } from "pages/_app";

import s from "./auth_popover.module.scss";

import { AccountCircleRounded } from "@mui/icons-material";
import { set } from "#root/store/productsSlice.js";

//todo work with focus and tabbing through popover
const AuthPopover = () => {
  const dispatch = useDispatch();

  const closePopover = () => document.body.click();

  const handleSignIn = async (e) => {
    closePopover();
    dispatch(toggleSignInModal());
  };

  const handleSignUp = async (e) => {
    closePopover();
    dispatch(toggleSignUpModal());
  };

  const [showPopover, setShowPopover] = useState(false);

  let popoverhover = false;
  const handleHide = () => {
    setTimeout(() => {
      if (!popoverhover) {
        setShowPopover(false);
      }
    }, 250);
  };

  const signInButtonRef = useRef(null);
  const activeEl = useRef(null);

  const handleShow = () => {
    setShowPopover(true);
  };

  const unsignedPopover = (
    <Popover
      className={`${s.auth_popover}`}
      onMouseLeave={() => {
        setShowPopover(false);
        popoverhover = false;
      }}
      onMouseEnter={() => {
        popoverhover = true;
      }}
    >
      <Popover.Body>
        <div className={`${s.unsigned_popover} ${balsamiqSans.className}`}>
          <button
            ref={signInButtonRef}
            className={` ${s.sign_in_button} button_submit`}
            onClick={handleSignIn}
          >
            <p>Увійти</p>
          </button>

          <p>
            <span>Не зареєстровані? </span>
            <Link
              href="/"
              onClick={handleSignUp}
              className={`${s.sign_up} icon-link`}
              onBlur={() => {
                setShowPopover(false);
                setTimeout(() => activeEl.current.focus(), 0);
              }}
            >
              Зареєструватись
            </Link>
          </p>
        </div>
      </Popover.Body>
    </Popover>
  );

  return (
    <li className={`${s.overlay_trigger}`} aria-label={"Персональний кабінет"}>
      <button aria-label="Увійти або зареєструватись" onClick={handleSignIn}>
        <OverlayTrigger
          trigger={["hover", "focus"]}
          placement="bottom"
          overlay={unsignedPopover}
          rootClose
          show={showPopover}
          onEntered={() =>
            signInButtonRef.current && signInButtonRef.current.focus()
          }
        >
          <AccountCircleRounded
            className={`${s.profile_icon}`}
            onMouseEnter={handleShow}
            onMouseLeave={handleHide}
          />
        </OverlayTrigger>
      </button>
    </li>
  );
};

export default AuthPopover;
