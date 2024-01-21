import Image from "next/image";
import s from "./card.module.scss";
import Link from "next/link";

const SubcategoryCard = ({ category }) => {
  const { name, image, _id } = category;

  return (
    <Link
      href={`/products/${category.path.replaceAll(",", "-")}`}
      onClick={() => console.log(_id)}
    >
      <div className={`${s.card}`}>
        <Image
          src={image}
          width={100}
          height={100}
          alt="subcategory image "
          className={`${s.image}`}
        ></Image>
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
