import { Modal } from "react-bootstrap";
import s from "./write_review_modal.module.scss";

import WriteReviewForm from "features/products/landing/mutual/write_review_form/write_review_form";

import { useDispatch, useSelector } from "react-redux";

import { toggleWriteReviewModal } from "store/modalSlice";
import { balsamiqSans } from "#root/pages/_app.js";

//todo input validation
const WriteReviewModal = () => {
  const dispatch = useDispatch();
  const { writeReviewModal } = useSelector((state) => state.modals);

  return (
    <Modal
      id="WriteReviewModal"
      show={writeReviewModal}
      onHide={() => dispatch(toggleWriteReviewModal())}
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
      </Modal.Body>
    </Modal>
  );
};

export default WriteReviewModal;
