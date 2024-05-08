import Image from "next/image";
import Link from "next/link";

import ImageFallback from "comps/image/fallback_image.js";

import s from "./figure.module.scss";
import lcs from "../listing_card.module.scss";
import { useDispatch } from "react-redux";

import { startLoading } from "store/slices/global_comps/global_comps.slice";

const ProductFigure = ({ product, productUrl }) => {
  const dispatch = useDispatch();
  return (
    <Link
      className={`${lcs.figure}`}
      href={productUrl("about")}
      onClick={() => dispatch(startLoading())}
    >
      <figure className={`${s.figure} `}>
        <ImageFallback
          src={
            //todo implement displaying many images on product
            product.images && product.images[0]
          }
          fallbackSrc={"/assets/goods_placeholder.svg"}
          alt="product image"
          quality={80}
          width={250}
          height={250}
          sizes="(max-width: 600px) 50vw, (max-width: 768px) 35vw,(max-width: 800px) 30vw,(max-width: 1200px) 25vw, 15vw"
          priority
        />
        <figcaption>{product.name}</figcaption>
      </figure>
    </Link>
  );
};

export default ProductFigure;
