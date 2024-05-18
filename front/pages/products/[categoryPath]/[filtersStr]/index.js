import axios from 'axios'
import Head from 'next/head'

import { useStopLoading } from 'hooks/useStopLoading'

import { useUpdateFilters } from 'features/products/listing/hooks/use_update_filters'
import { useDispatchInitialFilters } from 'features/products/listing/hooks/use_dispatch_initial_filters.js'
import { usePageValidation } from 'features/products/listing/hooks/use_page_validation'

import SubcategoriesGallery from 'features/products/listing/comps/subcategories/gallery'
import ProductListingBody from 'features/products/listing/layout/listing.body.js'

import { useRouter } from 'next/router'
import ListingHeader from '#root/features/products/listing/layout/listing.header.js'

import { unslugify } from '@bbuukk/slugtrans/slugify'
import { untransliterate } from '@bbuukk/slugtrans/transliterate'

//todo order filters
//todo navigate to main content if search is active and user is tabbing

const Listing = ({ data }) => {
  const router = useRouter()
  const { categoryPath } = router.query

  const {
    activeCategory: category,
    directSubcategories: subcategories,
    numPages,
  } = data

  const searchBy = categoryPath.includes('search=')
    ? `Результати пошуку "${untransliterate(unslugify(categoryPath.split('search=')[1]))}"`
    : `Товари у категорії "${category.path}"`

  useStopLoading()
  usePageValidation(numPages)

  useDispatchInitialFilters()

  useUpdateFilters()

  return (
    <>
      <Head>
        <title>{`${searchBy} у магазині Живий світ`}</title>
        <meta name='description' content={`Живий Світ | ${searchBy}`} />
      </Head>

      <>
        <>
          <ListingHeader category={category} />
          <SubcategoriesGallery subcategories={subcategories} />
        </>

        <ProductListingBody data={data} />
      </>
    </>
  )
}

export default Listing

export async function getServerSideProps(context) {
  const { categoryPath, filtersStr } = context.params

  const isBySearch = categoryPath.includes('search=')

  try {
    const method = isBySearch ? 'by-query' : 'by-category-path'
    const searchBy = isBySearch
      ? categoryPath.split('search=')[1]
      : categoryPath
    const url = `/products/${method}/${searchBy}/filtered-by/${filtersStr}`

    const data = await fetchData(url)

    const FIRST_PAGE = 1
    const HALF_AN_HOUR = 1800
    return {
      props: {
        data: {
          ...data,
          // filtersMap,
          page: filtersStr.match(/page=(\d+)/)[1] || FIRST_PAGE,
        },
        revalidate: HALF_AN_HOUR,
      },
    }
  } catch (e) {
    return { notFound: true }
  }
}

async function fetchData(url) {
  const response = await axios.get(url)
  return response.data
}
