import { useRouter } from "next/router";
import s from "./card.module.scss";

const Card = ({ category }) => {
  const router = useRouter();
  return (
    <div
      role="button"
      onClick={() => {
        router.push(`/products/${category.path}`);
      }}
      className={`${s.cat_card} `}
    >
      <p className={`${s.naming} `}>{category.name}</p>
      <img className="card-img-bottom" src={category.image} alt="category" />
    </div>
  );
};

function pathFormat(str) {
  return str;
}

export default Card;
