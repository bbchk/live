import Image from "next/image";
import Link from "next/link";
import s from "./figure.module.scss";
import lcs from "../listing_card.module.scss";
import { useDispatch } from "react-redux";

import { startLoading } from "store/modalSlice";

const ProductFigure = ({ product, productUrl }) => {
  const dispatch = useDispatch();
  return (
    <Link
      className={`${lcs.figure}`}
      href={productUrl("about")}
      onClick={() => dispatch(startLoading())}
    >
      <figure className={`${s.figure} `}>
        <Image
          src={
            //todo implement displaying many images on product
            product.images && product.images[0]
          }
          alt="product image"
          width={250}
          height={250}
          quality={100}
          priority
        />
        <figcaption>{product.name}</figcaption>
      </figure>
    </Link>
  );
};

export default ProductFigure;
