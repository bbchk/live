import ProductCard from "./card";

const ProductGallery = ({
  activeProducts: products,
  activeCategory: category,
}) => {
  return (
    <div className="container row row-cols-xs-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5 gx-3 gy-4">
      {/* {data.map((product) => {
        return (
          <div key={product._id} className="col">
            <ProductCard
              product={product}
              category={category}
              like={() => {}}
              isLiked={false}
            />
          </div>
        );
      })} */}
      {products.map((product) => {
        return (
          <div key={product._id} className="col">
            <ProductCard
              product={product}
              category={category}
              like={() => {}}
              isLiked={false}
            />
          </div>
        );
      })}
    </div>
  );
};

export default ProductGallery;
