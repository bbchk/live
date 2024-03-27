import { useAddToCart } from "hooks/useAddToCart";
import s from "./info_body.module.scss";
import { useSession } from "next-auth/react";

const InfoBody = ({ product }) => {
  const {
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
  } = product;

  const { addToCart } = useAddToCart();

  function handleBuy(product) {
    addToCart(product._id);

    return null;
  }

  return (
    <div className={`${s.body}`}>
      <div className={`${s.buy_area}`}>
        <div className={`${s.price}`}>
          <p>
            {price}
            <span className={`${s.currency}`}> ₴ </span>
          </p>
          <p className={`${s.left}`}>
            {left > 0 ? "Є в наявності" : "Немає в наявності"}{" "}
          </p>
        </div>

        <button
          className={` btn ${s.buy_button} icon-link `}
          onClick={() => handleBuy(product)}
        >
          <i className="bi bi-cart4"></i>
          <p>Купити</p>
        </button>
        <button className={` btn ${s.like_button} icon-link `}>
          <i className="bi bi-heart"></i>
        </button>
        <button className={` btn ${s.comment_button} icon-link `}>
          <i className="bi bi-chat-left-text"></i>
        </button>
      </div>
    </div>
  );
};

export default InfoBody;
