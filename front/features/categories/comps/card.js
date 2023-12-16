import s from "./card.module.scss";
import Link from "next/link";

const Card = ({ category }) => {
  return (
    <Link href={`/products/${category.path}`} className={`${s.cat_card} link`}>
      <p className={`${s.naming} `}>{category.name}</p>
      <img className="card-img-bottom" src={category.image} alt="category" />
    </Link>
  );
};

export default Card;
