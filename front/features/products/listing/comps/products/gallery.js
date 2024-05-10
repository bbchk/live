import { useEffect } from 'react';

import ListingProductCard from './card/listing.product_card';
import s from './gallery.module.scss';

const ProductGallery = ({
  activeProducts: products,
  activeCategory: category,
}) => {
  useEffect(() => {
    const element = document.getElementById('main_content');
    if (element) {
      element.scrollIntoView();
    }
  }, []);

  return (
    //todo make main work for accesability
    <main className={`${s.gallery}`}>
      {products.map((product) => {
        return (
          <ListingProductCard
            key={product._id}
            product={product}
            category={category}
            like={() => {}}
            isLiked={false}
          />
        );
      })}
    </main>
  );
};

export default ProductGallery;
