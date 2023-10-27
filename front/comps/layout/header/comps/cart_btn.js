import s from "./cart_btn.module.scss";

const ShoppingCartButton = ({ toggle }) => {
  return (
    <button className={`btn ${s.cart_btn}`} onClick={toggle}>
      <i className="bi bi-cart3 fs-3"></i>
    </button>
  );
};

export default ShoppingCartButton;
