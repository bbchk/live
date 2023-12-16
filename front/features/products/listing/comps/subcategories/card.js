import s from "./card.module.scss";
import Link from "next/link";

const SubcategoryCard = ({ category }) => {
  const { name, image } = category;

  return (
    <Link href={`/products/${category.path.replaceAll(",", "/")}`}>
      <div className={`${s.card}`}>
        <img
          src={image}
          width={100}
          height={100}
          alt="subcategory image "
          className={`${s.image}`}
        ></img>
        <p className={`${s.name}`}> {name}</p>
      </div>
    </Link>
  );
};

export default SubcategoryCard;

export const Box = () => {
  return (
    <div className="box">
      <div className="subcategory-card">
        <div className="overlap-group">
          <div className="text-wrapper">For Dogs</div>
          <img
            className="pembroke-welsh-corgi"
            alt="Pembroke welsh corgi"
            src="pembroke-welsh-corgi-1.png"
          />
        </div>
      </div>
    </div>
  );
};
