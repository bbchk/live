import s from "./quantity_input.module.scss";
import { useCart } from "hooks/useCart";

const QuantityInput = ({ product, quantity }) => {
  const { add, remove } = useCart();

  function handleBuy(product) {
    add(product);
  }

  return (
    <div className={`${s.quantity_input}`}>
      <button disabled={quantity === 1} onClick={() => remove(product._id)}>
        <i className="bi bi-dash-lg" />
      </button>

      <input type="text" value={quantity} readOnly disabled />

      <button onClick={() => add(product)}>
        <i className="bi bi-plus-lg" />
      </button>
    </div>
  );
};

export default QuantityInput;
