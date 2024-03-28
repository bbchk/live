import { Modal } from "react-bootstrap";
import s from "./cart_modal.module.scss";

import { useDispatch, useSelector } from "react-redux";
import { toggleCartModal } from "store/modalSlice";

import { balsamiqSans } from "pages/_app";

//todo input validation
import { useSession } from "next-auth/react";
import { use, useEffect, useState } from "react";

import CartItem from "./cart_item/cart_item";
import { set } from "store/productsSlice";

const CartModal = () => {
  const dispatch = useDispatch();
  const { cartModalOpen } = useSelector((state) => state.modals);

  const { data: session } = useSession();
  const [cartItems, setCartItems] = useState(null);
  const [totalCost, setTotalCost] = useState(0);

  //todo do it when session.cart changes, use useMemo

  useEffect(() => {
    if (session) {
      setCartItems(session.user.cart);
    } else {
      const localStorageCart = JSON.parse(localStorage.getItem("cart")) || [];
      setCartItems(localStorageCart);
    }
    //count total cost
    if (cartItems) {
      let totalCost = 0;
      cartItems.forEach((item) => {
        totalCost += item.product.price * item.quantity;
      });
      setTotalCost(totalCost);
    }
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
        <section>
          {cartItems &&
            cartItems.map(({ product, quantity }) => {
              return (
                <CartItem
                  key={product.id}
                  product={product}
                  quantity={quantity}
                />
              );
            })}
        </section>
        <footer>
          <p className={`${s.total_cost} price`}>
            <span>{`Всього:`}</span>
            {totalCost}
            <span>₴</span>
          </p>

          <menu className={`${s.controls}`}>
            <li>
              <button onClick={() => dispatch(toggleCartModal())}>
                Продовжити покупки
              </button>
            </li>

            <li>
              <button
                onClick={() => {
                  console.log("buy");
                }}
              >
                Оформити замовлення
              </button>
            </li>
          </menu>
        </footer>
      </Modal.Body>
    </Modal>
  );
};

export default CartModal;
