import FiltersAccordion from "features/products/listing/comps/filter/filters_accordion/filters_accordion";
import ProductGallery from "./comps/gallery/gallery";
import ProductsPagination from "./comps/gallery/pagination/pagination";
import SortGroup from "./comps/filter/sort-group";
import FiltersOffcanvasToggler from "features/products/listing/comps/filter/filiters_offcanvas/filters_offcanvas_toggler";

import s from "./product_listing_body.module.scss";
import FiltersOffcanvas from "./comps/filter/filiters_offcanvas/filters_offcanvas";
import Selected from "./comps/filter/selected";

const ProductListingBody = ({
  filtersMap,
  minMaxPrice,
  products,
  productsCount,
  category,
  numPages,
  page,
}) => {
  const filtersOffcanvasId = "filtersOffcanvas";

  return (
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
        <div className={`${s.filters_decor_line}`}></div>
        <div className={`${s.filters}`}>
          <FiltersAccordion
            id="filtersAccordion"
            filters={filtersMap}
            minMaxPrice={minMaxPrice}
          />
        </div>

        <div className={`${s.gallery}`}>
          <ProductGallery activeProducts={products} activeCategory={category} />
          <ProductsPagination numPages={numPages} activePageId={page} />
        </div>
      </div>
    </>
  );
};

export default ProductListingBody;
