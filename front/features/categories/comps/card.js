import { useSelector } from "react-redux";
import s from "./card.module.scss";
import Link from "next/link";
import { useState } from "react";

const Card = ({ category }) => {
  const [subcategories, setSubcategories] = useState(null);
  const { categories } = useSelector((state) => state.categories);

  const isOneDepthCategory = (category) => category.path.split(",").length == 1;

  function getSubcategories() {}

  return (
    <Link href={`/produc/${category.path}`} className={`${s.cat_card} link`}>
      <p className={`${s.naming} `}>{category.name}</p>
      <img className="card-img-bottom" src={category.image} alt="category" />
      {/* <ul>
        {subcategories.map((subcat) => {
          return (
            <li className={``} key={subcat._id}>
              <Link
                className="link"
                href={`/products/${category.path.replaceAll(",", "-")}`}
              >
                {pathElement}
              </Link>
            </li>
          );
        })}
      </ul> */}
    </Link>
  );
};

export default Card;
