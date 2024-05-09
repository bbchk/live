import { Modal } from "react-bootstrap";
import s from "./hotkeys.modal.module.scss";

import { useDispatch, useSelector } from "react-redux";
import {
  toggle,
  GLOBAL_COMPS,
} from "store/slices/global_comps/global_comps.slice";
const { HOTKEYS_MODAL } = GLOBAL_COMPS;

import { balsamiqSans } from "pages/_app";
import { KeyboardRounded } from "@mui/icons-material";
import { useId } from "react";
import useTabTrap from "comps/accessibility/hooks/useTabbingTrap.js";
import { useSession } from "next-auth/react";
import CustomAlert from "#root/comps/warnings/alert.js";

const HotkeysModal = () => {
  const dispatch = useDispatch();
  const { hotkeysModalOpen } = useSelector((state) => state.modals);

  const { data: session } = useSession();

  useTabTrap(hotkeysModalOpen, "hotkeysModal");

  const toggleModal = () => dispatch(toggle(HOTKEYS_MODAL));

  return (
    <>
      <Modal
        id="hotkeysModal"
        show={hotkeysModalOpen}
        onHide={toggleModal}
        centered
        size="xl"
        fullscreen="lg-down"
        className={`${s.modal} ${balsamiqSans.className}`}
      >
        <Modal.Header closeButton={true} className="modal_header_title_center">
          {/* <KeyboardRounded /> */}

          <h3>Гарячі клавіші</h3>
        </Modal.Header>
        <Modal.Body className={`${s.modal_body}`}>
          <div className={s.alert}>
            <CustomAlert
              text={
                "Переконайтесь, що використовуєте латиницю, деякі клавіші не підтримуються українською. Вибачте за тимчасові незручності!"
              }
              animated={false}
            />
          </div>
          <menu className={`${s.hotkeys_group} ${s.general}`}>
            <HotkeyItem
              dscrpt={"Відкрити вікно гарячих клавіш"}
              hk={["shift", "?"]}
            />
          </menu>
          <menu className={`${s.hotkeys_group} ${s.navigation}`}>
            <HotkeyItem
              dscrpt={"Перейти на домашню сторінку"}
              hk={["shift", "h"]}
            />
            <HotkeyItem dscrpt={"Відкрити кошик покупок"} hk={["shift", "c"]} />
            <HotkeyItem
              dscrpt={"Відкрити бокове меню"}
              hk={["alt", "shift", "o"]}
            />
          </menu>
          <menu className={`${s.hotkeys_group} ${s.focus}`}>
            <HotkeyItem
              dscrpt={"Фокусуватись на пошуку"}
              hk={["ctrl", "alt", "f"]}
            />
            <HotkeyItem
              dscrpt={"Фокусуватись на основному вмісті"}
              hk={["ctrl", "alt", "m"]}
            />
          </menu>

          <menu className={`${s.hotkeys_group} ${s.user} ${s.auth}`}>
            <HotkeyItem
              dscrpt={"Перейти до особистого кабінету"}
              hk={["shift", "p"]}
            />

            <HotkeyItem
              dscrpt={"Перейти до списку бажаного"}
              hk={["shift", "w"]}
            />
            <HotkeyItem
              dscrpt={"Перейти до моїх замовлень"}
              hk={["shift", "o"]}
            />
            <HotkeyItem
              dscrpt={"Вийти з облікового запису"}
              hk={["alt", "shift", "q"]}
            />
          </menu>
          <menu className={`${s.hotkeys_group} ${s.user} ${s.not_auth}`}>
            <>
              <HotkeyItem
                dscrpt={"Зареєструвати обліковий запис"}
                hk={["alt", "shift", "u"]}
              />
              <HotkeyItem
                dscrpt={"Увійти в обліковий запис"}
                hk={["alt", "shift", "i"]}
              />
            </>
          </menu>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default HotkeysModal;

const HotkeyItem = ({ dscrpt, hk }) => {
  const id = useId();
  return (
    <li className={`${s.hotkey_item}`}>
      <p className={`${s.description}`}>{dscrpt}</p>
      <p className={`${s.keys}`}>
        {hk.map((k) => (
          <span key={`${id}-${k}`}>{k}</span>
        ))}
      </p>
    </li>
  );
};
