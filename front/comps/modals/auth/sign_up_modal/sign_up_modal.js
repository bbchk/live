import { useSignUp } from "hooks/useSignUp";
import { useState } from "react";
import { Modal } from "react-bootstrap";

import s from "./sign_up_modal.module.scss";
import modal_s from "../modal.module.scss";
import Link from "next/link";
import SignFormByServices from "../sign_form_by_services";
import VerticalSplitter from "../vertical_splitter";
import SignUpForm from "./sign_up_form_by_credentials";
import { useSelector } from "react-redux";

import { useDispatch } from "react-redux";
import {
  toggle as tg,
  GLOBAL_COMPS,
} from "store/slices/global_comps/global_comps.slice";
const { SIGN_IN_MODAL, SIGN_UP_MODAL } = GLOBAL_COMPS;

import { useSession } from "next-auth/react";

//todo input validation
import CustomAlert from "comps/warnings/alert";
import useTabTrap from "#root/comps/accessibility/hooks/useTabbingTrap.js";

const SignUpModal = () => {
  const dispatch = useDispatch();
  const { signUpModalOpen } = useSelector((state) => state.modals);

  const toggle = () => dispatch(tg(SIGN_UP_MODAL));
  const toggleAlternative = () => dispatch(tg(SIGN_IN_MODAL));

  useTabTrap(signUpModalOpen, "signUpModal");

  const { data: session } = useSession();
  if (session) {
    return <CustomAlert text={"Ви уже авторизовані 😌"} />;
  }

  return (
    <>
      <Modal
        id="signUpModal"
        show={signUpModalOpen}
        onHide={toggle}
        fullscreen="md-down"
        centered
        className={`${modal_s.modal}`}
      >
        <Modal.Header className="modal_header_title_center" closeButton={true}>
          <h3 className={`${modal_s.heading}`}>Реєстрація</h3>
        </Modal.Header>
        <Modal.Body className={`${modal_s.modal_body}`}>
          <SignUpForm
            toggleModal={toggle}
            toggleSignInModal={toggleAlternative}
          />
          <VerticalSplitter />
          <SignFormByServices />
        </Modal.Body>
      </Modal>
    </>
  );
};

export default SignUpModal;
