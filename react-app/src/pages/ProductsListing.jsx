import React, { useEffect, useState, Suspense } from 'react'
import { Helmet } from 'react-helmet-async'
import { useParams } from 'react-router-dom'
import axios from 'axios'

import LoadingSpinner from 'comps/loading/spinner.js'
import { useStopLoading } from 'hooks/useStopLoading'
import { useUpdateFilters } from 'features/products/listing/hooks/use_update_filters'
import { useDispatchInitialFilters } from 'features/products/listing/hooks/use_dispatch_initial_filters.js'
import { usePageValidation } from 'features/products/listing/hooks/use_page_validation'

import ProductListingBody from 'features/products/listing/layout/listing.body.js'
import ListingHeader from 'features/products/listing/layout/listing.header.js'

import { unslugify } from '@bbuukk/slugtrans/slugify'
import { untransliterate } from '@bbuukk/slugtrans/transliterate'

// Lazy load components
const SubcategoriesGallery = React.lazy(() => 
  import('features/products/listing/comps/subcategories/gallery.js')
)

const ProductsListing = () => {
  const { categoryPath, filtersStr } = useParams()
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useStopLoading()

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      setError(null)

      const isBySearch = categoryPath.includes('search=')

      try {
        const method = isBySearch ? 'by-query' : 'by-category-path'
        const searchBy = isBySearch
          ? categoryPath.split('search=')[1]
          : categoryPath
        const url = `/products/${method}/${searchBy}/filtered-by/${filtersStr || 'default'}`

        const res = await axios.get(url)
        const responseData = res.data

        const FIRST_PAGE = 1
        setData({
          ...responseData,
          page: filtersStr?.match(/page=(\d+)/)?.[1] || FIRST_PAGE,
        })
      } catch (e) {
        console.error('Error fetching products:', e)
        setError(e)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [categoryPath, filtersStr])

  const {
    activeCategory: category,
    directSubcategories: subcategories,
    numPages,
  } = data || {}

  usePageValidation(numPages)
  useDispatchInitialFilters()
  useUpdateFilters()

  if (loading) {
    return <LoadingSpinner />
  }

  if (error || !data) {
    return <div>Error loading products. Please try again.</div>
  }

  const searchBy = categoryPath.includes('search=')
    ? `Результати пошуку "${untransliterate(unslugify(categoryPath.split('search=')[1]))}"`
    : `Товари у категорії "${category.path}"`

  return (
    <>
      <Helmet>
        <title>{`${searchBy} у магазині Живий світ`}</title>
        <meta name='description' content={`Живий Світ | ${searchBy}`} />
      </Helmet>

      <>
        <ListingHeader category={category} />
        <Suspense fallback={<LoadingSpinner />}>
          <SubcategoriesGallery subcategories={subcategories} />
        </Suspense>
        <ProductListingBody data={data} />
      </>
    </>
  )
}

export default ProductsListing
