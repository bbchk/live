import { Modal } from "react-bootstrap";
import s from "./cart_modal.module.scss";

import { useDispatch, useSelector } from "react-redux";
import { toggleCartModal } from "store/modalSlice";

import { balsamiqSans } from "pages/_app";

//todo input validation
import { useSession } from "next-auth/react";

const CartModal = () => {
  //for getting orders items
  const dispatch = useDispatch();
  const { data: session } = useSession();

  const { cartModalOpen } = useSelector((state) => state.modals);

  // const handleBuy = async (e, value) => {
  // };

  return (
    <Modal
      id="changePasswordModalOpen"
      show={cartModalOpen}
      onHide={() => dispatch(toggleCartModal())}
      centered
      size="xl"
      className={`${s.modal} ${balsamiqSans.className}`}
    >
      <Modal.Header closeButton={true} className={`${s.modal_header}`}>
        <h3>Кошик покупок</h3>
      </Modal.Header>
      <Modal.Body className={`${s.modal_body}`}>
        <h1>IN DEV</h1>
      </Modal.Body>
    </Modal>
  );
};

export default CartModal;
