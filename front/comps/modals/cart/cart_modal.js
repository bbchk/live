import { Modal } from "react-bootstrap";
import s from "./cart_modal.module.scss";

import { useDispatch, useSelector } from "react-redux";
import { toggleCartModal } from "store/modalSlice";

import { balsamiqSans } from "pages/_app";

//todo input validation
import { useSession } from "next-auth/react";
import { use, useEffect, useState } from "react";

const CartModal = () => {
  const dispatch = useDispatch();
  const { cartModalOpen } = useSelector((state) => state.modals);

  const { data: session } = useSession();
  const [cartItems, setCartItems] = useState([]);

  //todo do it when session.cart changes, use useMemo
  useEffect(() => {
    if (session) {
      setCartItems(session.user.cart);
    } else {
      const localStorageCart = JSON.parse(localStorage.getItem("cart")) || [];
      setCartItems(localStorageCart);
    }
    console.log(cartItems);
  }, [cartModalOpen]);

  // const handleBuy = async (e, value) => {};

  return (
    <Modal
      id="changePasswordModalOpen"
      show={cartModalOpen}
      onHide={() => dispatch(toggleCartModal())}
      centered
      fullscreen="lg-down"
      size="xl"
      className={`${s.modal} ${balsamiqSans.className}`}
    >
      <Modal.Header closeButton={true} className={`${s.modal_header}`}>
        <h3>Кошик покупок</h3>
      </Modal.Header>
      <Modal.Body className={`${s.modal_body}`}>
        {cartItems &&
          cartItems.map((item) => {
            return (
              <div className="bg-dark" key={`${item.productId}CartItem`}>
                <p>{item.name}</p>
                <p>{item.quantity}</p>
              </div>
            );
          })}
      </Modal.Body>
    </Modal>
  );
};

export default CartModal;
