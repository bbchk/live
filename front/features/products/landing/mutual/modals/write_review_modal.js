import { Modal } from "react-bootstrap";
import s from "./write_review_modal.module.scss";

import WriteReviewForm from "../write_review_form";

import { useDispatch, useSelector } from "react-redux";

import { toggleWriteReviewModal } from "store/modalSlice";

//todo input validation
const WriteReviewModal = () => {
  const dispatch = useDispatch();
  const { writeReviewModal } = useSelector((state) => state.modals);

  const toggle = () => dispatch(toggleWriteReviewModal());

  return (
    <Modal
      id="WriteReviewModal"
      show={writeReviewModal}
      onHide={toggle}
      centered
      fullscreen="md-down"
      className={`${s.modal}`}
    >
      <Modal.Header closeButton={true} className="modal_header_title_center">
        <h3>Вхід</h3>
      </Modal.Header>
      <Modal.Body className={`${s.modal_body}`}>
        <WriteReviewForm />
      </Modal.Body>
    </Modal>
  );
};

export default WriteReviewModal;
