// import Figure from "../../mutual/auxiliary/figure";
import s from './order-card.module.scss';

const OrderCard = ({
  imageUrl,
  naming = 'Алєана 16*15.5 фіолетовий прозорий',
  amount = 1,
  price = 10,
}) => {
  return (
    <>
      <div className={`${s.order_card}`}>
        <div className={`${s.image}`}>{/* <Figure /> */}</div>
        <div className={`${s.info}`}>
          <p className={`${s.naming}`}>{naming}</p>
          <div className={`${s.bottom}`}>
            <p className={`${s.amount}`}>{`${amount} pieces`}</p>
            <p className={`${s.price}`}>{`${price} $`}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderCard;
