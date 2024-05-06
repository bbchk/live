import { signOut, useSession } from "next-auth/react";

import s from "./main_offcanvas_body.module.scss";
import NavItem from "./comps/nav_item";
import NavLink from "./comps/nav_link";
import UserItem from "./comps/user_item";
import OffcanvasBody from "comps/offcanvas/offcanvas_body";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import {
  faBasketShopping,
  faListUl,
  faLayerGroup,
} from "@fortawesome/free-solid-svg-icons";

const MainOffcanvasBody = () => {
  const router = useRouter();
  const { data: session } = useSession();

  return (
    <div className={`${s.body}`}>
      <UserItem />
      <ul className="navbar-nav justify-content-end flex-grow-1">
        {session ? (
          <>
            <NavItem href={"/"} text={"Усі категорії товарів"}>
              <FontAwesomeIcon icon={faLayerGroup} />
            </NavItem>

            <NavItem href={"/profile/wish_list"} text={"Список бажань"}>
              <FontAwesomeIcon icon={faHeart} />
            </NavItem>

            <NavItem href={"/profile/orders_list"} text={"Мої замовлення"}>
              <FontAwesomeIcon icon={faListUl} />
            </NavItem>
          </>
        ) : (
          <NavItem href={"/"} text={"Усі категорії товарів"}>
            <FontAwesomeIcon icon={faLayerGroup} />
          </NavItem>
        )}

        <NavItem href={"#"} text={"Кошик покупок"}>
          <FontAwesomeIcon icon={faBasketShopping} />
        </NavItem>
      </ul>
      <ul
        className={`navbar-nav justify-content-end flex-grow-1 ${s.link_section}`}
      >
        <h5>Інформація про магазин</h5>
        <NavLink text={"Про нас"} href={"/info"} />
        <NavLink text={"Політика приватності"} href={"/privacy-policy"} />
        <NavLink text={"Умови використання сайту"} href={"/terms-of-usage"} />
      </ul>
      {session && (
        <ul className="navbar-nav justify-content-end flex-grow-1">
          <NavItem
            href={"#"}
            onClick={() => {
              signOut({ callbackUrl: "/" }).then(() => {
                window.location.href = "/";
              });
            }}
            icon={"bi-box-arrow-left"}
            text={"Вихід з акаунту"}
          />
        </ul>
      )}
    </div>
  );
};

export default MainOffcanvasBody;
