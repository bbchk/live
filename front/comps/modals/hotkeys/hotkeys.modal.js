import { Modal } from "react-bootstrap";
import s from "./hotkeys.modal.module.scss";

import { useDispatch, useSelector } from "react-redux";
import { toggleHotkeysModalOpen } from "store/modalSlice";

import { balsamiqSans } from "pages/_app";
import { KeyboardRounded } from "@mui/icons-material";
import { useId } from "react";

const HotkeysModal = () => {
  const dispatch = useDispatch();
  const { hotkeysModalOpen } = useSelector((state) => state.modals);

  const toggleModal = () => dispatch(toggleHotkeysModalOpen());

  return (
    <Modal
      id="HotkeysModalOpen"
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
        <menu className={`${s.hotkeys_group} ${s.general}`}>
          <HotkeyItem
            dscrpt={"Відкрити модальне вікно гарячих клавіш"}
            hk={["shift", "?"]}
          />
        </menu>
        <menu className={`${s.hotkeys_group} ${s.navigation}`}>
          <HotkeyItem
            dscrpt={"Перейти на домашню сторінку"}
            hk={["shift", "h"]}
          />
          <HotkeyItem dscrpt={"Перейти до профілю"} hk={["shift", "p"]} />
          <HotkeyItem
            dscrpt={"Відкрити модальне вікно кошика"}
            hk={["shift", "c"]}
          />
          <HotkeyItem
            dscrpt={"Відкрити модальне вікно входу"}
            hk={["alt", "shift", "i"]}
          />
          <HotkeyItem
            dscrpt={"Відкрити модальне вікно реєстрації"}
            hk={["alt", "shift", "u"]}
          />
          <HotkeyItem
            dscrpt={"Відкрити головне вікно offcanvas"}
            hk={["alt", "shift", "o"]}
          />
        </menu>
        <menu className={`${s.hotkeys_group} ${s.focus}`}>
          <HotkeyItem
            dscrpt={"Фокус на рядку пошуку"}
            hk={["ctrl", "alt", "f"]}
          />
          <HotkeyItem
            dscrpt={"Фокус на основному вмісті"}
            hk={["ctrl", "alt", "m"]}
          />
        </menu>
      </Modal.Body>
    </Modal>
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
