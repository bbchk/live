import FiltersAccordion from 'features/products/listing/comps/filter/filters_accordion/filters_accordion'

import ProductGallery from 'features/products/listing/comps/gallery/gallery.js'
import ProductsPagination from 'features/products/listing/comps/gallery/pagination/pagination.js'
import SortGroup from 'features/products/listing/comps/filter/sort-group.js'
import FiltersOffcanvasToggler from 'features/products/listing/comps/filter/filiters_offcanvas/filters_offcanvas_toggler'

import s from './listing.body.module.scss'

import FiltersOffcanvas from 'features/products/listing/comps/filter/filiters_offcanvas/filters_offcanvas.js'
import Selected from 'features/products/listing/comps/filter/selected.js'
import NoProductYet from '#root/comps/warnings/no_products.js'
import { useSelector } from 'react-redux'

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
  //todo lazy load
  const { filterOffcanvasOpen } = useSelector((state) => state.modals)

  return (
    <>
      {productsCount > 0 ? (
        <>
          {filterOffcanvasOpen && (
            <FiltersOffcanvas
              filters={filtersMap}
              minMaxPrice={minMaxPrice}
              productsCount={productsCount}
            />
          )}

          <div className={`${s.body}`}>
            <div className={`${s.filters_offcanvas_toggler}`}>
              <FiltersOffcanvasToggler />
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
                filters={filtersMap}
                minMaxPrice={minMaxPrice}
              />
            </div>

            <div className={`${s.gallery}`}>
              <div className={`${s.products}`}>
                <ProductGallery
                  activeProducts={products}
                  activeCategory={category}
                />
              </div>
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
  )
}

export default ProductListingBody
