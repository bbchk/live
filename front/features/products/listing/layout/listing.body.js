import s from './listing.body.module.scss'

import { useMediaQuery, ThemeProvider } from '@mui/material'
import { useSelector } from 'react-redux'

import dynamic from 'next/dynamic'

import LoadingSpinner from '#root/comps/loading/spinner.js'

const NoProductYet = dynamic(() => import('comps/warnings/no_products.js'), {
  loading: () => <LoadingSpinner />,
  ssr: false,
})

const FiltersAccordion = dynamic(
  () =>
    import(
      'features/products/listing/comps/filter/filters_accordion/filters_accordion'
    ),
  { loading: () => <LoadingSpinner /> },
)

const FiltersOffcanvas = dynamic(
  () =>
    import(
      'features/products/listing/comps/filter/filiters_offcanvas/filters_offcanvas.js'
    ),
  { loading: () => <LoadingSpinner /> },
)

const ProductsPagination = dynamic(
  () =>
    import('features/products/listing/comps/gallery/pagination/pagination.js'),
  { ssr: false },
)

const Selected = dynamic(
  () => import('features/products/listing/comps/filter/selected.js'),
  { ssr: false },
)

const FiltersOffcanvasToggler = dynamic(
  () =>
    import(
      'features/products/listing/comps/filter/filiters_offcanvas/filters_offcanvas_toggler'
    ),
  { ssr: true },
)

import SortGroup from 'features/products/listing/comps/filter/sort-group.js'
import ProductGallery from 'features/products/listing/comps/gallery/gallery.js'

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
  const isSmallViewport = useMediaQuery('(max-width:1100px)') // Adjust the value as needed
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
            {isSmallViewport && (
              <div className={`${s.filters_offcanvas_toggler}`}>
                <FiltersOffcanvasToggler />
              </div>
            )}
            <div className={`${s.selected}`}>
              <Selected productsCount={productsCount} />
            </div>
            <div className={`${s.sort_group}`}>
              <SortGroup />
            </div>
            <div className={`${s.filters_decor_line}`}></div>
            {!isSmallViewport && (
              <div className={`${s.filters}`}>
                <FiltersAccordion
                  filters={filtersMap}
                  minMaxPrice={minMaxPrice}
                />
              </div>
            )}

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
        <div className={`${s.no_products}`}>
          <NoProductYet />
        </div>
      )}
    </>
  )
}

export default ProductListingBody
