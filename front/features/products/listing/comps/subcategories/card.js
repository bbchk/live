import s from "./card.module.scss";
import Image from "next/image";

const SubcategoryCard = ({ name, image }) => {
  //todo use Image from next/image

  return (
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
  );
};

export default SubcategoryCard;
