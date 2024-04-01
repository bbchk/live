import s from "./info_body.module.scss";
import { useSession } from "next-auth/react";
import { useCart } from "hooks/useCart";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
// import { faThumbsUp } from "@fortawesome/free-regular-svg-icons";
// import { faThumbsDown } from "@fortawesome/free-regular-svg-icons";
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import { faThumbsDown } from "@fortawesome/free-solid-svg-icons";

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

  const { add } = useCart();
  function handleBuy(product) {
    add(product);
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
          // className={` btn ${s.buy_button} icon-link`}
          className={` btn ${s.buy_button} icon-link`}
          onClick={() => handleBuy(product)}
        >
          <i className="bi bi-cart4"></i>
          <p>Купити</p>
        </button>
        <button className={` btn ${s.like_button} icon-link `}>
          <FontAwesomeIcon
            icon={faHeart}
            size="xs"
            style={{ color: "#FFD43B" }}
          />
        </button>
        <button className={` btn ${s.comment_button} icon-link `}>
          <FontAwesomeIcon
            icon={faThumbsUp}
            size="xs"
            // style={{ color: "#FFD43B" }}
          />
        </button>
        <button className={` btn ${s.comment_button} icon-link `}>
          <FontAwesomeIcon
            icon={faThumbsDown}
            flip="horizontal"
            size="xs"
            // style={{ color: "#FFD43B" }}
          />
        </button>
      </div>
    </div>
  );
};

export default InfoBody;
