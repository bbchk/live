import Link from "next/link";
import s from "./rating.module.scss";
import lcs from "../listing.product_card.module.scss";
import Image from "next/image";
import StarRating from "comps/rating/star_rating";
import { useDispatch } from "react-redux";
import { startLoading } from "store/slices/global_comps/global_comps.slice";

//use rating from product
const ProductRating = ({ product, productUrl }) => {
  return (
    <section className={` ${lcs.rating}`}>
      <Link
        className={`${s.rating}`}
        href={productUrl("characteristics")}
        onClick={() => dispatch(startLoading())}
      >
        <StarRating rating={2.5} />
        <i className="bi bi-chat-left-text" />
        <p>{10}</p>
      </Link>
    </section>
  );
};

export default ProductRating;
