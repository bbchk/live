import s from "./info_body.module.scss";

const InfoBody = ({
  product: {
    brand,
    name,
    category,
    price,
    description,
    images,
    weight,
    left,
    reviews = ["good", "bad", "good", "bad", "good", "bad"],
    starRating = 3.7,
    packing,
    code = "000000",
  },
}) => {
  return (
    <div className={`${s.body}`}>
      <div className={`${s.buy_area}`}>
        <p className={`${s.price}`}>
          <span>
            {price}
            <span className={`${s.currency}`}> грн </span>
          </span>
          <span className={`${s.left}`}>
            {left > 0 ? "Є в наявності" : "Немає в наявності"}{" "}
          </span>
        </p>
        <button className={` btn ${s.buy_button} icon-link `}>
          <i className="bi bi-cart4"></i>
          <p>Купити</p>
        </button>
      </div>
      <button className={` btn ${s.like_button} icon-link `}>
        <i className="bi bi-heart"></i>
      </button>
      <button className={` btn ${s.comment_button} icon-link `}>
        <i className="bi bi-chat-left-text"></i>
      </button>
    </div>
  );
};

export default InfoBody;
