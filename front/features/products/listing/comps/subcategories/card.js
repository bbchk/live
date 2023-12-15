import s from "./card.module.scss";
import Image from "next/image";
import { useRouter } from "next/router";

const SubcategoryCard = ({ category }) => {
  //todo use Image from next/image
  const router = useRouter();
  const { name, image } = category;

  const parsePath = (path) => {
    const parsedPath = path.replaceAll(",", "/");
    console.log(parsedPath);
    return parsedPath;
  };

  return (
    <div
      role="button"
      className={`${s.card}`}
      onClick={() => {
        router.push({
          pathname: `/products/${parsePath(category.path)}`,
          // pathname: `/`,
        });
      }}
    >
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
