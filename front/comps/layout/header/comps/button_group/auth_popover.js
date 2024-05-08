import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Popover from "react-bootstrap/Popover";
import { useDispatch } from "react-redux";

import {
  toggle,
  GLOBAL_COMPS,
} from "store/slices/global_comps/global_comps.slice";
const { SIGN_IN_MODAL, SIGN_UP_MODAL } = GLOBAL_COMPS;

import { balsamiqSans } from "pages/_app";

import s from "./auth_popover.module.scss";

import { AccountCircleRounded } from "@mui/icons-material";
import useDoOnKey from "hooks/useDoOnKey";

const AuthPopover = () => {
  const lastFocusedElement = useRef(null);
  const signInButton = useRef(null);

  const dispatch = useDispatch();

  const [showPopover, setShowPopover] = useState(false);

  const handleHide = () => {
    lastFocusedElement.current && lastFocusedElement.current.focus();
    setTimeout(() => {
      setShowPopover(false);
    }, 250);
  };

  const handleShow = () => {
    lastFocusedElement.current = document.activeElement;
    setShowPopover(true);
    setTimeout(() => {
      signInButton.current.focus({ preventScroll: true });
    }, 250);
  };

  useDoOnKey("Escape", handleHide);

  const unsignedPopover = (
    <Popover
      id="authPopover"
      className={`${s.auth_popover}`}
      onMouseEnter={handleShow}
    >
      <Popover.Body onMouseLeave={handleHide}>
        <div className={`${s.unsigned_popover} ${balsamiqSans.className}`}>
          <button
            ref={signInButton}
            className={` ${s.sign_in_button} button_submit`}
            onClick={() => {
              setShowPopover(false);
              dispatch(toggle(SIGN_IN_MODAL));
            }}
          >
            <p>Увійти</p>
          </button>

          <p>
            <span>Не зареєстровані? </span>
            <Link
              href="/"
              onClick={() => {
                setShowPopover(false);
                dispatch(toggle(SIGN_UP_MODAL));
              }}
              className={`${s.sign_up} icon-link`}
            >
              Зареєструватись
            </Link>
            <div
              className="visually_hidden"
              tabIndex={0}
              onFocus={(e) => {
                e.preventDefault();
                handleHide();
              }}
            />
          </p>
        </div>
      </Popover.Body>
    </Popover>
  );

  return (
    <li className={`${s.overlay_trigger}`} aria-label={"Персональний кабінет"}>
      <div aria-label="Увійти або зареєструватись">
        <OverlayTrigger
          trigger={["hover", "focus"]}
          placement="bottom"
          overlay={unsignedPopover}
          rootClose
          show={showPopover}
        >
          <button
            className={`${s.popover_button}`}
            onClick={handleShow}
            onMouseLeave={handleHide}
          >
            <AccountCircleRounded
              className={`${s.profile_icon}`}
              onMouseEnter={handleShow}
            />
          </button>
        </OverlayTrigger>
      </div>
    </li>
  );
};

export default AuthPopover;
