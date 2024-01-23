import Link from "next/link";
import s from "./card.module.scss";
import Image from "next/image";

const ProductCard = ({
  product: { _id, name, images, price },
  activeCategory,
  like,
  isLiked,
}) => {
  const productUrl = `/products/${activeCategory.path.replaceAll(
    ",",
    "-"
  )}/${_id}`;

  return (
    <div className={`${s.product_card} `}>
      <button
        className={`${s.like_button} btn`}
        // onClick={() => like(_id)}
        onClick={() => like(_id)}
      >
        {!isLiked && <i className="bi bi-heart" />}
        {isLiked && <i className={`bi bi-heart-fill ${s.liked}`} />}
      </button>

      <Link href={`${productUrl}/about`} className={`${s.image_link}`}>
        <Image
          className={`${s.image}`}
          src={
            //todo implement displaying many images on product
            images && images[0]
          }
          alt="product image"
          width={100}
          height={100}
          priority
        />
      </Link>

      <Link href={`${productUrl}/about`} className={`${s.name}`}>
        {name}
      </Link>

      <Link href={`${productUrl}/reviews`} className={`${s.rating}`}>
        <StarRating />
        <p className={`${s.amount_reviews}`}>
          <i className="bi bi-chat-left-text"></i>
          <span>{10}</span>
        </p>
      </Link>

      <div className={`${s.buy_info}`}>
        <p className={`${s.price}`}>
          {price} <span>₴</span>
        </p>

        <button
          className={`${s.buy_button}`}
          //  onClick={addProductToCart}
        >
          <i className="bi bi-cart4"></i>
        </button>
      </div>
    </div>
  );
};

export default ProductCard;

const StarRating = ({ ratingNumber }) => {
  let starArray = [];
  let star = <i className={`bi bi-star-fill  ${s.star}`} />;
  starArray.push(...new Array(5).fill(star));

  return <div className={`${s.stars}`}>{starArray}</div>;
};
