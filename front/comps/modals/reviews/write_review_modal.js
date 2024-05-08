import { Modal } from "react-bootstrap";
import s from "./write_review_modal.module.scss";

import WriteReviewForm from "features/products/landing/mutual/write_review_form/write_review_form";

import { useDispatch, useSelector } from "react-redux";

import { balsamiqSans } from "#root/pages/_app.js";
import useTabTrap from "comps/accessibility/hooks/useTabbingTrap.js";
import {
  toggle,
  GLOBAL_COMPS,
} from "store/slices/global_comps/global_comps.slice";
const { WRITE_REVIEW_MODAL } = GLOBAL_COMPS;

//todo input validation
const WriteReviewModal = () => {
  const dispatch = useDispatch();
  const { writeReviewModalOpen } = useSelector((state) => state.modals);

  useTabTrap(writeReviewModalOpen, "writeReviewModal");

  return (
    <Modal
      id="writeReviewModal"
      show={writeReviewModalOpen}
      onHide={() => dispatch(toggle(WRITE_REVIEW_MODAL))}
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
