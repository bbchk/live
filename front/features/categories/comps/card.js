import { useDispatch } from "react-redux";
import s from "./card.module.scss";

import Link from "next/link";
import Image from "next/image";

import { slugify } from "@bbuukk/slugtrans/slugify";
import { transliterate } from "@bbuukk/slugtrans/transliterate";

import { startLoading } from "store/slices/global_comps/global_comps.slice.js";
import ImageFallback from "comps/image/fallback_image.js";

const Card = ({ category, subcategories }) => {
  const dispatch = useDispatch();

  const categoryPathSlug = (path) => {
    return `/products/${slugify(transliterate(path))}/page=1`;
  };

  function handleClick() {
    dispatch(startLoading());
  }

  return (
    <div className={`${s.cat_card}`}>
      <Link
        href={categoryPathSlug(category.path)}
        onClick={handleClick}
        // aria-label={`Navigate to ${category.name}`}
      >
        <ImageFallback
          src={category.imagePath}
          fallbackSrc={"/assets/goods_placeholder.svg"}
          alt="основна категорія"
          width={300}
          height={150}
          sizes="(max-width: 600px) 50vw, (max-width: 768px) 20vw, (max-width: 1000px) 25vw, (max-width: 1200px) 20vw, 15vw"
          priority
        />
        <h2>{category.name}</h2>
      </Link>

      <ul className={`${s.subcat_list}`}>
        {subcategories.map(({ _id, path, name }) => {
          return (
            <li key={_id}>
              <Link href={categoryPathSlug(path)} onClick={handleClick}>
                {name}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Card;
