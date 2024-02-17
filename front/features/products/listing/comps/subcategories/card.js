import Image from "next/image";
import s from "./card.module.scss";
import Link from "next/link";

import { useDispatch } from "react-redux";
import { setActiveCategory } from "root/store/categoriesSlice";

import { slugify } from "root/utils/slugify";
import { transliterate } from "root/utils/transliterate";

const SubcategoryCard = ({ category }) => {
  const { name, imagePath, _id } = category;

  function saveActiveCategory() {
    if (typeof window !== "undefined") {
      localStorage.setItem("activeCategory", JSON.stringify(category));
    }
  }

  const categoryPathSlug = `/products/${slugify(transliterate(category.path))}`;

  return (
    <Link
      href={{
        pathname: categoryPathSlug,
        query: { category: JSON.stringify(category) },
      }}
      as={categoryPathSlug}
      onMouseDown={saveActiveCategory}
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
