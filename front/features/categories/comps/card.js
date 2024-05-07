import { useDispatch } from "react-redux";
import s from "./card.module.scss";

import Link from "next/link";
import Image from "next/image";

import { slugify } from "@bbuukk/slugtrans/slugify";
import { transliterate } from "@bbuukk/slugtrans/transliterate";

import { startLoading } from "store/modalSlice.js";
import ImageFallback from "comps/image/fallback_image.js";

const Card = ({ category, subcategories }) => {
  const dispatch = useDispatch();

  const categoryPathSlug = (path) => {
    return `/products/${slugify(transliterate(path))}/page=1`;
  };

  return (
    <div className={`${s.cat_card}`}>
      <Link
        href={categoryPathSlug(category.path)}
        onClick={() => dispatch(startLoading())}
      >
        <ImageFallback
          src={category.imagePath}
          fallbackSrc={"/assets/goods_placeholder.svg"}
          alt="основна категорія"
          width={300}
          height={150}
          sizes="(max-width: 600px) 50vw, (max-width: 768px) 35vw, 20vw"
          priority
        />
        <Image />
        <h2 className={`${s.naming} `}>{category.name}</h2>
      </Link>

      <ul className={`${s.subcat_list}`}>
        {subcategories.map(({ _id, path, name }, index) => {
          return (
            <li key={_id}>
              <Link
                href={categoryPathSlug(path)}
                onClick={() => dispatch(startLoading())}
              >
                {index == 4 ? `${name}` : `${name}`}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Card;
