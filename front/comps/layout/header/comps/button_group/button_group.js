import { useSession } from "next-auth/react";
import Image from "next/image";

import { useDispatch } from "react-redux";
import { toggleCartModal } from "store/modalSlice";

import hs from "../../header.module.scss";

import IconButton from "./icon_button";
import AuthPopover from "./auth_popover";
import s from "./button_group.module.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faListUl } from "@fortawesome/free-regular-svg-icons";
import { faBasketShopping } from "@fortawesome/free-solid-svg-icons";

//todo list of links with unordered list
const ButtonGroup = () => {
  const dispatch = useDispatch();
  const { data: session } = useSession();

  return (
    <nav className={` ${s.auth_btn_group} ${hs.icon_btn_group}`}>
      <ul>
        {session ? (
          session.user.image && (
            <IconButton
              href={"/profile/personal_data"}
              tooltipText={"Персональний кабінет"}
            >
              <Image
                src={session.user.image}
                alt="Profile"
                width={50}
                height={50}
              />
            </IconButton>
          )
        ) : (
          <AuthPopover />
        )}

        {session && (
          <>
            <IconButton
              href={"/profile/orders_list"}
              tooltipText={"Список замовлень"}
            >
              <i className={`bi bi-list-ul `} />
            </IconButton>
            <IconButton
              href={"/profile/wish_list"}
              tooltipText={"Список бажаного"}
            >
              <FontAwesomeIcon icon={faHeart} />
            </IconButton>
          </>
        )}

        <IconButton
          tooltipText={"Кошик покупок"}
          onClick={() => dispatch(toggleCartModal())}
        >
          <FontAwesomeIcon icon={faBasketShopping} />
        </IconButton>
      </ul>
    </nav>
  );
};

export default ButtonGroup;
