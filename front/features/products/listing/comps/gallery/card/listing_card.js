import Link from 'next/link';
import s from './listing_card.module.scss';

import { slugify } from '@bbuukk/slugtrans/slugify';
import { transliterate } from '@bbuukk/slugtrans/transliterate';
import ProductFigure from './comps/figure';
import ProductRating from './comps/rating';
import BuyInfo from './comps/buy_info';
import LikeButton from './comps/like_btn';

const ListingProductCard = ({ product, like, isLiked, ...props }) => {
  const productUrl = (activeTab) =>
    `/product/${slugify(transliterate(product.name))}/${
      product._id
    }/${activeTab}`;

  const { priority } = props;

  return (
    <article className={`${s.card} `}>
      <LikeButton isLiked={false} />
      <ProductFigure
        product={product}
        productUrl={productUrl}
        priority={priority}
      />
      <ProductRating product={product} productUrl={productUrl} />
      <BuyInfo product={product} />
    </article>
  );
};

export default ListingProductCard;
