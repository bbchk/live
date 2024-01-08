import { useSelector } from "react-redux";
import s from "./card.module.scss";
import Link from "next/link";
import { useState, useEffect } from "react";
import Image from "next/image";

const Card = ({ category }) => {
  const [subcategories, setSubcategories] = useState(null);
  const { categories } = useSelector((state) => state.categories);

  //todo unefficient
  useEffect(() => {
    const pathString = category.path;
    //looking for subcategories of current category
    const regex = new RegExp(`^${pathString},[^,]+$`);
    const subcategories = categories.filter((c) => {
      return c.path.match(regex) && c.path !== pathString;
    });
    setSubcategories(subcategories.slice(0, 5));
  }, []);

  return (
    <>
      {subcategories && (
        <Link href={`/products/${category.path}`} className={`${s.cat_card}`}>
          <Image
            className={``}
            src={category.image}
            alt="Category image"
            width={100}
            height={100}
            priority
          />
          <h2 className={`${s.naming} `}>{category.name}</h2>

          <ul className={`${s.subcat_list}`}>
            {subcategories.map(({ _id, path, name }, index) => {
              return (
                <li key={_id}>
                  <Link href={`/products/${path.replaceAll(",", "-")}`}>
                    {index == 4 ? `${name} ...` : `${name}`}
                  </Link>
                </li>
              );
            })}
          </ul>
        </Link>
      )}
    </>
  );
};

export default Card;
