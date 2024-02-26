import { useSignIn } from "hooks/useSignIn";
import { useState } from "react";
import { Modal } from "react-bootstrap";
import s from "./sign_in_modal.module.scss";
import modal_s from "./modal.module.scss";
import VerticalSplitter from "./vertical_splitter";
import Link from "next/link";
import { signIn } from "next-auth/react";
import SignInFormByCredentials from "./sign_in_form_by_credentials";
import SignFormByServices from "./sign_form_by_services";

//todo input validation
//todo make modal responsive

const SignInModal = ({ isOpen, toggle, toggleSignUpModal }) => {
  const [showA, setShowA] = useState(true);
  const [showB, setShowB] = useState(false);
  return (
    <>
      <Modal
        id="SignInModal"
        show={isOpen && showA}
        onHide={toggle}
        centered
        className={`${modal_s.modal}`}
      >
        <Modal.Header closeButton={true} className={`${modal_s.modal_header}`}>
          <h3 className={`${modal_s.heading}`}>Вхід</h3>
        </Modal.Header>
        <Modal.Body className={`${modal_s.modal_body}`}>
          <SignInFormByCredentials
            toggleModal={toggle}
            toggleSignUpModal={toggleSignUpModal}
          />

          <VerticalSplitter />

          <SignFormByServices />
        </Modal.Body>
      </Modal>
    </>
  );
};

export default SignInModal;
