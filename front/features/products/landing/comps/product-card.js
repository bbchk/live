import Image from "next/image";
import StarRating from "root/comps/star-rating";
import s from "./product-card.module.scss";

const ProductCard = ({
  _id,
  name = "Краплі на холку для собак ProVET «Мега Стоп» до 4 кг, 4 піпетки (від зовнішніх та внутрішніх паразитів)",
  brand,
  price = "153.60",
  isAvailable,
  starRating,
  packing,
  description,
  imageUrl = "/content/categories/photos/dog.jpeg",
  like,
  isLiked,
  article = "27394384",
}) => {
  return (
    <div className={`${s.product_card}`}>
      <div className={`${s.figure}`}>
        <Image
          src={imageUrl}
          alt="Picture of the product"
          width={500}
          height={500}
          className={`${s.image}`}
        ></Image>
      </div>
      <div className={`${s.info}`}>
        <p className={`${s.article}`}>Код: {article}</p>
        <div className={`${s.header}`}>
          <p className={`${s.name}`}>{name}</p>
          <StarRating score={4} fontSize={"1.4rem"} />
        </div>

        <div className={`${s.buy_area}`}>
          <div className={`${s.price_area}`}>
            <p className={`${s.price}`}>
              {price}
              <span> грн </span>
            </p>
            <p className={`${s.is_available}`}>
              {isAvailable ? "Є в наявності" : "Немає в наявності"}
            </p>
          </div>
          <button
            className={` btn ${s.buy_button} icon-link btn-outline-success`}
          >
            <i className="bi bi-cart4"></i>
            <p>Купити</p>
          </button>
        </div>
        <div
          className={`${s.pay_info}`}
          data-bs-toggle="collapse"
          href="#collapseExample"
          role="button"
          aria-expanded="false"
          aria-controls="collapseExample"
        >
          <i className="bi bi-credit-card"></i>
          Some placeholder content for the collapse component. This panel is
          hidden by default but
          <i className="bi bi-caret-down-fill"></i>
          <p id="collapseExample" className="collapse">
            revealed when the user activates the relevant trigger.
          </p>
        </div>
        <div className={`${s.garantee_info}`}>
          <i className="bi bi-shield-check"></i>
          Some placeholder content for the collapse component. This panel is
          hidden by default but
          <i className="bi bi-caret-down-fill"></i>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
