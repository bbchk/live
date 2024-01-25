import Link from "next/link";
import s from "./card.module.scss";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { setActiveCategory } from "root/store/categoriesSlice";
import { makeSlug } from "root/utils/slugify";
import { setActiveProduct } from "root/store/productsSlice";
import { useEffect, useId, useRef, useState } from "react";
import axios from "axios";

const ProductCard = ({ product, like, isLiked }) => {
  const { lastActiveCategory } = useSelector((state) => state.categories);

  const productUrl = `/products/${makeSlug(lastActiveCategory.path)}/${makeSlug(
    product.name
  )}`;

  const dispatch = useDispatch();
  function saveActiveProductInfo() {
    localStorage.setItem("activeProduct", JSON.stringify(product));
    dispatch(setActiveProduct(product));
  }

  return (
    <div className={`${s.product_card} `}>
      <button
        className={`${s.like_button} btn`}
        // onClick={() => like(_id)}
        onClick={() => like(product._id)}
      >
        {!isLiked && <i className="bi bi-heart" />}
        {isLiked && <i className={`bi bi-heart-fill ${s.liked}`} />}
      </button>

      <Link
        href={`${productUrl}/about`}
        className={`${s.image_link}`}
        onClick={saveActiveProductInfo}
      >
        <Image
          className={`${s.image}`}
          src={
            //todo implement displaying many images on product
            product.images && product.images[0]
          }
          alt="product image"
          width={100}
          height={100}
          priority
        />
      </Link>

      <Link
        href={`${productUrl}/about`}
        className={`${s.name}`}
        onClick={saveActiveProductInfo}
      >
        {product.name}
      </Link>
      <button
        disabled
        onClick={async () => {
          const token =
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTRlMmE4ZGU4MmU5OTZjM2JhOGRjNTEiLCJmaXJzdE5hbWUiOiJhbm90aGVyIiwic2Vjb25kTmFtZSI6IkJ1Y2hvayIsImVtYWlsIjoiYm9kaWFuYnVjaG9rQGdtYWlsLmNvbSIsImlhdCI6MTY5OTYyMTYyOX0.3HiuXKQozAYbhdp2kmAy9_yGah47GjGIaHVWLOD638s";
          const config = {
            headers: { Authorization: `Bearer ${token}` },
          };
          const res = await axios
            .delete(`/products/${product._id}`, config)
            .then((response) => {
              console.log(response.data);
            })
            .catch((error) => {
              console.error(error);
            });
        }}
      >
        DELETE
      </button>

      <CheckboxForm
        categories={product.category}
        handleSubmit={async (event, checkedValues) => {
          event.preventDefault();
          // checkedValues = [];
          //Для Котів,туалетні наповнювач
          // checkedValues = ["65ad3ec1864774208de09916"];
          //Для Котів,Корм та Смаколики
          // checkedValues = ["65ad3ec1864774208de09906"];
          //Для Котів,Ветперпар
          // checkedValues = ["65ad3ec1864774208de0990b"];
          //Для Собак,Ветперпар
          // checkedValues = ["65ad3ec1864774208de098f6"];
          //Для Котів,Ветперпар
          //Для Собак,Ветперпар
          // checkedValues = [
          //   "65ad3ec1864774208de0990b",
          // "65ad3ec1864774208de098f6",
          // ];
          console.log(checkedValues);
          let newProduct = { ...product, category: checkedValues };
          console.log(newProduct);

          console.log(`products/${product._id}`);

          const token =
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTRlMmE4ZGU4MmU5OTZjM2JhOGRjNTEiLCJmaXJzdE5hbWUiOiJhbm90aGVyIiwic2Vjb25kTmFtZSI6IkJ1Y2hvayIsImVtYWlsIjoiYm9kaWFuYnVjaG9rQGdtYWlsLmNvbSIsImlhdCI6MTY5OTYyMTYyOX0.3HiuXKQozAYbhdp2kmAy9_yGah47GjGIaHVWLOD638s";
          const config = {
            headers: { Authorization: `Bearer ${token}` },
          };

          const res = await axios
            .patch(`/products/${product._id}`, newProduct, config)
            .then((response) => {
              console.log(response.data);
            })
            .catch((error) => {
              console.error(error);
            });
        }}
      />

      {/* {product.category.map((c) => {
        return <p>{c.name}</p>;
      })} */}

      <Link
        href={`${productUrl}/reviews`}
        className={`${s.rating}`}
        onClick={saveActiveProductInfo}
      >
        <StarRating />
        <p className={`${s.amount_reviews}`}>
          <i className="bi bi-chat-left-text"></i>
          <span>{10}</span>
        </p>
      </Link>

      <div className={`${s.buy_info}`}>
        <p className={`${s.price}`}>
          {product.price} <span>₴</span>
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

const CheckboxForm = ({ categories, handleSubmit }) => {
  const [checkedValues, setCheckedValues] = useState([]);

  const handleChange = (event) => {
    if (event.target.checked) {
      console.log(event.target.value);
      setCheckedValues([...checkedValues, event.target.value]);
    } else {
      setCheckedValues(
        checkedValues.filter((item) => item !== event.target.value)
      );
    }
  };

  return (
    <form onSubmit={(event) => handleSubmit(event, checkedValues)}>
      {categories.map((c) => {
        return <CheckBox category={c} handleChange={handleChange}></CheckBox>;
      })}
      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );
};

const CheckBox = ({ category, handleChange }) => {
  return (
    <div className="form-check">
      <input
        className="form-check-input"
        type="checkbox"
        value={category._id}
        onChange={handleChange}
        id={category._id}
      />
      <label className="form-check-label" for={category._id}>
        {category.path}
      </label>
    </div>
  );
};
