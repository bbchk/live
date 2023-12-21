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
    imageUrl,
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
            src={"/logo.svg"}
            alt="Picture of the product"
            width={500}
            height={500}
            className={`${s.image}`}
          ></Image>
        </div>
        <div className={`${s.info}`}>
          <div className={`${s.header}`}>
            <p className={`${s.code}`}>Код: {code}</p>
            <p className={`${s.name}`}>{name}</p>
            <div className={`${s.splitter}`}></div>
          </div>

          <div className={`${s.body}`}>
            <div className={`${s.buy_area}`}>
              <div className={`${s.price_area}`}>
                <p className={`${s.price}`}>
                  {price}
                  <span> грн </span>
                </p>
              </div>

              <button className={` btn ${s.buy_button} icon-link `}>
                <i className="bi bi-cart4"></i>
                <p>Купити</p>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductCard;
