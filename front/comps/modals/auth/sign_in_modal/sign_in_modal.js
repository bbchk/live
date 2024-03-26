import { useSignIn } from "hooks/useSignIn";
import { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import s from "./sign_in_modal.module.scss";
import modal_s from "../modal.module.scss";
import VerticalSplitter from "../vertical_splitter";
import Link from "next/link";
import { signIn, useSession } from "next-auth/react";
import SignInFormByCredentials from "./sign_in_form_by_credentials";
import SignFormByServices from "../sign_form_by_services";
import { useDispatch, useSelector } from "react-redux";

import { toggleSignInModal, toggleSignUpModal } from "store/modalSlice";
import axios from "axios";

//todo input validation
//todo make modal responsive

const SignInModal = () => {
  const dispatch = useDispatch();
  const { signInModalOpen } = useSelector((state) => state.modals);

  const toggle = () => dispatch(toggleSignInModal());
  const toggleAlternative = () => dispatch(toggleSignUpModal());

  const { data: session } = useSession();
  useEffect(() => {
    if (session) {
      const { id, token } = session.user;
      async function syncCart() {
        const localStorageCart = JSON.parse(localStorage.getItem("cart")) || [];

        try {
          const res = await axios.patch(
            `/user/cart/${id}/sync`,
            localStorageCart,
            {
              headers: {
                "Content-type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            }
          );
          console.log(res.data);
        } catch (error) {
          console.error(error);
        }
      }
      syncCart();
    }
  }, [session]);

  return (
    <>
      <Modal
        id="SignInModal"
        show={signInModalOpen}
        onHide={toggle}
        centered
        className={`${modal_s.modal}`}
      >
        <Modal.Header closeButton={true} className="modal_header_title_center">
          <h3 className={`${modal_s.heading}`}>Вхід</h3>
        </Modal.Header>
        <Modal.Body className={`${modal_s.modal_body}`}>
          <SignInFormByCredentials
            toggleModal={toggle}
            toggleSignUpModal={toggleAlternative}
          />

          <VerticalSplitter />

          <SignFormByServices />
        </Modal.Body>
      </Modal>
    </>
  );
};

export default SignInModal;
