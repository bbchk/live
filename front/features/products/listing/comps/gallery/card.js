import StarRating from "root/comps/star-rating";
import Link from "next/link";
import s from "./product-card.module.scss";
import { useRouter } from "next/router";
import slugify from "root/utils/slugify";

const ProductCard = ({
  product: { _id, name, imageUrl, price, category },
  like,
  isLiked,
}) => {
  return (
    <Link
      className={`${s.product_card} `}
      role="button"
      tabIndex="0"
      href={`/products/${category.path.replaceAll(",", "-")}/${_id}/about`}
      onClick={() => console.log(name)}
    >
      <div
        className={`${s.like_button}`}
        role="button"
        onClick={() => like(_id)}
      >
        <i
          className={`bi bi-heart-fill ${s.like_icon} ${
            isLiked ? s.isLiked : ""
          }`}
        ></i>
      </div>

      <div className={`${s.image_body}`}>
        <img className={`${s.image}`} src={imageUrl} alt="category" />
        <StarRating className={"medium"} />
      </div>

      <div className={`${s.info}`}>
        <h4 className={` ${s.name}  ${s.truncate_overflow}`}>{name}</h4>

        <div className={`${s.buy_area}`}>
          <p className={`${s.price}`}>
            {price} <span>₴</span>
          </p>
          <button className={` btn ${s.buy_button}`}>
            <i className="bi bi-cart4"></i>
          </button>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
