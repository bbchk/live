import { useAuthContext } from "root/hooks/useAuthContext";
import { useSignOut } from "root/hooks/useSingOut";
import Link from "next/link";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Popover from "react-bootstrap/Popover";
import s from "./profile_popover.module.scss";

const ProfilePopover = ({ toggleSignInModal, toggleSignUpModal }) => {
  const { user } = useAuthContext();
  const { signOut } = useSignOut();

  const handleSignOut = async (e) => {
    signOut();
  };

  const handleSignIn = async (e) => {
    document.body.click();
    toggleSignInModal();
  };

  const handleSignUp = async (e) => {
    document.body.click();
    toggleSignUpModal();
  };

  const closePopover = () => {
    document.body.click();
  };

  const unsignedPopover = (
    <Popover id="popover-basic" className={`${s.profile_popover}`}>
      <Popover.Body>
        <div className={`${s.unsigned_popover}`}>
          <button
            className={`icon-link btn bg-success ${s.sign_in_button}`}
            onClick={handleSignIn}
          >
            Увійти
          </button>

          <p>
            Not registered yet?{" "}
            <Link href="/" onClick={handleSignUp} className="icon-link">
              Зареєструватись
            </Link>
          </p>
        </div>
      </Popover.Body>
    </Popover>
  );

  const signedPopover = (
    <Popover id="popover-basic" className={`${s.profile_popover}`}>
      <Popover.Body>
        <div className={`${s.signed_popover}`}>
          <ul>
            <li>
              <Link
                onClick={closePopover}
                href="/profile/personal_data"
                className="icon-link"
              >
                <p>
                  <i className="bi bi-person-lines-fill"></i>
                  Особисті дані
                </p>
              </Link>
            </li>
            {/* <hr /> */}
            <li>
              <Link
                onClick={closePopover}
                href="/profile/wish_list"
                className="icon-link"
              >
                <p>
                  {" "}
                  <i className="bi bi-heart-fill"></i>
                  Список бажань
                </p>
              </Link>
            </li>
            {/* <hr /> */}
            <li>
              <Link
                onClick={closePopover}
                href="/profile/orders_list"
                className="icon-link"
              >
                <p>
                  {" "}
                  <i className="bi bi-list-check"></i>Мої замовлення
                </p>
              </Link>
            </li>
            {/* <hr /> */}
            <li className="mt-3 text-center">
              <Link href="/" onClick={handleSignOut} className="icon-link">
                <p>
                  Вийти <i className="bi bi-box-arrow-right "></i>
                </p>
              </Link>
            </li>
          </ul>
        </div>
      </Popover.Body>
    </Popover>
  );

  return (
    <OverlayTrigger
      trigger="click"
      placement="bottom"
      overlay={user ? signedPopover : unsignedPopover}
      rootClose
    >
      <div role="button">
        <i className={`bi bi-person-circle fs-1 ${s.profile_icon}`}></i>
      </div>
    </OverlayTrigger>
  );
};

export default ProfilePopover;
