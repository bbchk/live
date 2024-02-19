import { useDispatch, useSelector } from "react-redux";
import s from "./card.module.scss";
import Link from "next/link";
import { useState, useEffect } from "react";
import Image from "next/image";

import { slugify } from "@bbuukk/slugtrans/slugify";
import { transliterate } from "@bbuukk/slugtrans/transliterate";

const Card = ({ category }) => {
  const [subcategories, setSubcategories] = useState(null);
  const { categories } = useSelector((state) => state.categories);

  //todo unefficient
  useEffect(() => {
    //looking for subcategories of current category
    const pathString = category.path;
    const regex = new RegExp(`^${pathString},[^,]+$`);
    const subcategories = categories.filter((c) => {
      return c.path.match(regex) && c.path !== pathString;
    });
    setSubcategories(subcategories.slice(0, 5));
  }, []);

  function saveActiveCategory() {
    if (typeof window !== "undefined") {
      localStorage.setItem("activeCategory", JSON.stringify(category));
    }
  }
  const categoryPathSlug = `/products/${slugify(
    transliterate(category.path)
  )}/page/1`;

  return (
    <>
      {subcategories && (
        <div className={`${s.cat_card}`}>
          <Link
            href={{
              pathname: categoryPathSlug,
              query: { category: JSON.stringify(category) },
            }}
            as={categoryPathSlug}
            onMouseDown={saveActiveCategory}
          >
            <Image
              className={``}
              src={category.imagePath}
              alt="Category image"
              width={100}
              height={100}
              priority
            />
            <h2 className={`${s.naming} `}>{category.name}</h2>
          </Link>

          <ul className={`${s.subcat_list}`}>
            {subcategories
              .sort((a, b) => a.order - b.order)
              .map(({ _id, path, name }, index) => {
                return (
                  <li key={_id}>
                    <Link
                      href={`/products/${slugify(transliterate(path))}/page/1`}
                    >
                      {index == 4 ? `${name}` : `${name}`}
                    </Link>
                  </li>
                );
              })}
          </ul>
        </div>
      )}
    </>
  );
};

export default Card;
