import { Modal } from "react-bootstrap";
import s from "./write_review_modal.module.scss";

import WriteReviewForm from "../../../features/products/landing/mutual/write_review_form";

import { useDispatch, useSelector } from "react-redux";

import { toggleWriteReviewModal } from "store/modalSlice";
import { balsamiqSans } from "#root/pages/_app.js";
import Link from "next/link";

//todo input validation
const WriteReviewModal = () => {
  const dispatch = useDispatch();
  const { writeReviewModal } = useSelector((state) => state.modals);

  const toggle = () => dispatch(toggleWriteReviewModal());

  function handleSubmit() {
    console.log("Submit");
    toggle();
  }

  return (
    <Modal
      id="WriteReviewModal"
      show={writeReviewModal}
      onHide={toggle}
      centered
      size="lg"
      fullscreen="md-down"
      className={`${s.modal} ${balsamiqSans.className}`}
    >
      <Modal.Header closeButton={true} className="modal_header_title_center">
        <h3>Написати відгук</h3>
      </Modal.Header>
      <Modal.Body className={`${s.body}`}>
        <WriteReviewForm />
        {/* <menu className={`${s.button_group}`}>
        <li>
          <button
            className="button_primary"
            type="button"
            onClick={() => toggle()}
          >
            Скасувати
          </button>
        </li>
        <li>
          <button className="button_submit" onClick={() => handleSubmit()}>
            Залишити відгук
          </button>
        </li>
      </menu> */}
      </Modal.Body>
    </Modal>
  );
};

export default WriteReviewModal;
