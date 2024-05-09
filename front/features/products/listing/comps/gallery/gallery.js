import ListingProductCard from "./card/listing_card";
import s from "./gallery.module.scss";

const ProductGallery = ({
  activeProducts: products,
  activeCategory: category,
}) => {
  return (
    //todo make main work for accesability
    <main className={`${s.gallery}`}>
      {products.map((product, idx) => {
        return (
          <ListingProductCard
            key={product._id}
            product={product}
            like={() => {}}
            isLiked={false}
            priority={idx < 10}
          />
        );
      })}
    </main>
  );
};

export default ProductGallery;
