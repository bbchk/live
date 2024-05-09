import FiltersAccordion from "features/products/listing/comps/filters/filters_accordion/filters_accordion";
import ProductGallery from "../comps/products/gallery";
import ProductsPagination from "../comps/products/pagination/pagination";
import SortGroup from "../comps/filters/sort-group";
import FiltersOffcanvasToggler from "features/products/listing/comps/filters/filiters_offcanvas/filters_offcanvas_toggler";

import s from "./listing.body.module.scss";

import FiltersOffcanvas from "../comps/filters/filiters_offcanvas/filters_offcanvas";
import Selected from "../comps/filters/selected";
import NoProductYet from "#root/comps/warnings/no_products.js";

const ProductListingBody = ({
  data: {
    filtersMap,
    minMaxPrice,
    products,
    productsCount,
    category,
    numPages,
    page,
  },
}) => {
  const filtersOffcanvasId = "filtersOffcanvas";

  return (
    <>
      {productsCount > 0 ? (
        <>
          <FiltersOffcanvas
            id={filtersOffcanvasId}
            filters={filtersMap}
            minMaxPrice={minMaxPrice}
            productsCount={productsCount}
          />
          <div className={`${s.body}`}>
            <div className={`${s.filters_offcanvas_toggler}`}>
              <FiltersOffcanvasToggler id={filtersOffcanvasId} />
            </div>
            <div className={`${s.selected}`}>
              <Selected productsCount={productsCount} />
            </div>
            <div className={`${s.sort_group}`}>
              <SortGroup />
            </div>
            <div className={`${s.filters_decor_line}`} />
            <div className={`${s.filters}`}>
              <FiltersAccordion
                id="filtersAccordion"
                filters={filtersMap}
                minMaxPrice={minMaxPrice}
              />
            </div>

            <div className={`${s.gallery}`}>
              <ProductGallery
                activeProducts={products}
                activeCategory={category}
              />
              <ProductsPagination numPages={numPages} activePageId={page} />
            </div>
          </div>
        </>
      ) : (
        <div className={`${s.no_prodcuts}`}>
          <NoProductYet />
        </div>
      )}
    </>
  );
};

export default ProductListingBody;
