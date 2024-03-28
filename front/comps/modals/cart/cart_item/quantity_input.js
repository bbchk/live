import s from "./quantity_input.module.scss";
import { useCart } from "hooks/useCart";

const QuantityInput = ({ quantity }) => {
  const { add } = useCart();

  function handleBuy(product) {
    add(product);
  }

  return (
    <div className={`${s.quantity_input}`}>
      <button disabled={quantity === 1} onClick={() => {}}>
        <i class="bi bi-dash-lg" />
      </button>

      <input type="text" value={quantity} readOnly disabled />

      <button onClick={() => {}}>
        <i class="bi bi-plus-lg" />
      </button>
    </div>
  );
};

export default QuantityInput;
