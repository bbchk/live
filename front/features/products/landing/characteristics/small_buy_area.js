import s from './small_buy_area.module.scss';

const SmallBuyArea = ({ product: { price } }) => {
  return (
    <div className={`${s.small_buy_area}`}>
      <p className={`${s.price}`}>
        {price}
        <span> грн </span>
      </p>
      <button className={` ${s.buy_button} icon-link `}>
        <p>Купити</p>
        <i className="bi bi-cart4"></i>
      </button>
    </div>
  );
};

export default SmallBuyArea;
