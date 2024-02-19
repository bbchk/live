import Navigation from "../../../../../../features/products/landing/comps/layout/navigation";
import Characteristics from "../../../../../../features/products/landing/comps/characteristics/characteristics";
import SmallCard from "../../../../../../features/products/landing/comps/characteristics/small_card";
import SmallBuyArea from "../../../../../../features/products/landing/comps/characteristics/small_buy_area";
import { useSelector } from "react-redux";
import { slugify } from "@bbuukk/slugtrans/slugify";
import { transliterate } from "@bbuukk/slugtrans/transliterate";
import DecorLine from "../../../../../../comps/decor_line";
import Breadcrumbs from "root/comps/breadcrumbs";
import { useRouter } from "next/router";
import LandingProuductLayout from "../../../../../../features/products/landing/comps/layout/layout";

const Product = () => {
  const router = useRouter();

  return (
    <>
      <h1>UNDER DEV</h1>
      {/* {product && (
        <LandingProuductLayout
          category={category}
          product={product}
          activePage={"characteristics"}
        >
          <DecorLine />
          <div className="container">
            <div className="d-flex justify-content-between">
              <Characteristics
                title={`Характеристики ${product.name}`}
                product={product}
              />
              <div className="d-flex flex-column gap-2">
                <SmallCard product={product} />
                <SmallBuyArea product={product} />
              </div>
            </div>
          </div>
        </LandingProuductLayout>
      )} */}
    </>
  );
};

export default Product;
