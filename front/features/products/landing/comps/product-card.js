import Image from "next/image";
import StarRating from "root/comps/star-rating";
import s from "./product-card.module.scss";

const ProductCard = ({
  product: {
    code,
    brand,
    name,
    barcode,
    category,
    price,
    description,
    images,
    weight,
    left,
    starRating,
    packing,
  },
}) => {
  return (
    <>
      <div className={`${s.product_banner}`}>
        <div className={`${s.frame}`}>
          <Image
            src={images && images[0]}
            alt="Picture of the product"
            width={500}
            height={500}
            className={`${s.image}`}
          ></Image>
        </div>
        <div className={`${s.info}`}>
          <div className={`${s.header}`}>
            <p className={`${s.name}`}>{name}</p>
          </div>

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
        </div>
      </div>
    </>
  );
};

export default ProductCard;
