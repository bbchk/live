import Image from "next/image";
import s from "./card.module.scss";
import Link from "next/link";

const SubcategoryCard = ({ category }) => {
  const { name, imagePath, _id } = category;

  return (
    <Link
      href={`/products/${category.path.replaceAll(",", "-")}`}
      className={`${s.card}`}
    >
      <Image
        src={imagePath}
        width={100}
        height={100}
        alt="subcategory image"
        className={`${s.image}`}
      />
      <p className={`${s.name}`}> {name}</p>
    </Link>
  );
};

export default SubcategoryCard;
