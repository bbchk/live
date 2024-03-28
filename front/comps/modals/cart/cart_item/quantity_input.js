import s from "./quantity_input.module.scss";

const QuantityInput = ({ quantity }) => {
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
