import { useRouter } from "next/router";

import Navigation from "../../../../features/products/landing/comps/navigation";
import Characteristics from "../../../../features/products/landing/comps/characteristics/characteristics";
import SmallCard from "../../../../features/products/landing/comps/characteristics/small_card";
import SmallBuyArea from "../../../../features/products/landing/comps/characteristics/small_buy_area";
import { useSelector } from "react-redux";
import { makeSlug } from "root/utils/slugify";
import DecorLine from "../../../../comps/decor_line";
import Breadcrumbs from "root/comps/breadcrumbs";

const Product = () => {
  const { lastActiveProduct: activeProduct } = useSelector(
    (state) => state.products
  );
  const { lastActiveCategory: activeCategory } = useSelector(
    (state) => state.categories
  );

  return (
    <>
      {activeProduct && (
        <>
          <Breadcrumbs activeCategory={activeCategory} />
          <div className="">
            <Navigation
              activePage={"characteristics"}
              productSlug={makeSlug(activeProduct.name)}
            />
            {/* <StarRating> */}
          </div>
          <DecorLine />
          <div className="container">
            <div className="d-flex justify-content-between">
              <Characteristics
                title={`Характеристики ${activeProduct.name}`}
                product={activeProduct}
              />
              <div className="d-flex flex-column gap-2">
                <SmallCard product={activeProduct} />
                <SmallBuyArea product={activeProduct} />
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Product;
