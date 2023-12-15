import s from "./card.module.scss";
import Link from "next/link";

const SubcategoryCard = ({ category }) => {
  const { name, image } = category;

  return (
    <Link
      className={`${s.card}`}
      href={`/products/${category.path.replaceAll(",", "/")}`}
    >
      <img
        src={image}
        width={100}
        height={100}
        alt="subcategory image "
        className={`${s.image}`}
      ></img>
      <p className={`${s.name}`}> {name}</p>
    </Link>
  );
};

export default SubcategoryCard;
