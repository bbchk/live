import Image from "next/image";
import s from "./card.module.scss";
import Link from "next/link";
import { makeSlug } from "root/utils/slugify";
import { useDispatch } from "react-redux";
import { setActiveCategory } from "root/store/categoriesSlice";

const SubcategoryCard = ({ category }) => {
  const { name, imagePath, _id } = category;

  const dispatch = useDispatch();
  function saveActiveCategory() {
    if (typeof window !== "undefined") {
      localStorage.setItem("activeCategory", JSON.stringify(category));
    }
    dispatch(setActiveCategory(category));
  }

  return (
    <Link
      href={`/products/${makeSlug(category.path.replaceAll(",", "-"))}`}
      onClick={saveActiveCategory}
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
