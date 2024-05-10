import OrderCard from './order-card';
import s from './order.module.scss';

const Order = ({ id = 123287, date = '07.02.2012' }) => {
  return (
    <>
      <div className={`card card-body ${s.data}`}>
        <a
          className={`icon-link fs-4 ${s.header}`}
          data-bs-toggle="collapse"
          href="#collapseExample2"
          role="button"
          aria-expanded="false"
          aria-controls="collapseExample2"
        >
          <h3 className={`${s.orderId}`}>{`Order #${id}`}</h3>
          <h3 className={`${s.orderDate}`}>{`${date}`}</h3>
        </a>

        <div className={`collapse show ${s.header}`} id="collapseExample2">
          <OrderCard />
        </div>
      </div>
    </>
  );
};

export default Order;
