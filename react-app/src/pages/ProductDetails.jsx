import React, { useEffect, useState, Suspense } from 'react'
import { Helmet } from 'react-helmet-async'
import { useParams, Navigate } from 'react-router-dom'
import axios from 'axios'

import { stripHtmlTags } from 'utils/stripHtmlTags'
import { useStopLoading } from 'hooks/useStopLoading'
import LandingHeader from 'features/products/landing/mutual/layout/landing_header.js'
import LoadingSpinner from 'comps/loading/spinner.js'

// Lazy load components
const LandingProductAboutPage = React.lazy(() => 
  import('features/products/landing/about/landing_product_about')
)
const Characteristics = React.lazy(() => 
  import('features/products/landing/characteristics/index')
)
const LandingProductReviewsPage = React.lazy(() => 
  import('features/products/landing/reviews/reviews_page')
)

const ProductDetails = () => {
  const { productSlug, productId, activeTab = 'about' } = useParams()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useStopLoading()

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true)
      setError(null)

      try {
        const res = await axios.get(`/products/product/by-id/${productId}`)
        setProduct(res.data)
      } catch (e) {
        console.error('Error fetching product:', e)
        setError(e)
      } finally {
        setLoading(false)
      }
    }

    if (productId) {
      fetchProduct()
    }
  }, [productId])

  // Validate activeTab
  const validTabs = ['about', 'characteristics', 'reviews']
  if (!validTabs.includes(activeTab)) {
    return <Navigate to="/404" replace />
  }

  if (loading) {
    return <LoadingSpinner />
  }

  if (error || !product) {
    return <div>Error loading product. Please try again.</div>
  }

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'about':
        return <LandingProductAboutPage product={product} />
      case 'characteristics':
        return <Characteristics product={product} />
      case 'reviews':
        return <LandingProductReviewsPage product={product} />
      default:
        return <LandingProductAboutPage product={product} />
    }
  }

  return (
    <>
      <Helmet>
        <title>{`${product.name} в інтернет-магазині Живий світ`}</title>
        <meta
          name='description'
          content={`${product.name}\n\n${stripHtmlTags(
            product.description.substring(0, 110),
          )}...`}
        />
      </Helmet>

      <LandingHeader category={product.category[0]} activeTab={activeTab} />

      <Suspense fallback={<LoadingSpinner />}>
        {renderActiveTab()}
      </Suspense>
    </>
  )
}

export default ProductDetails
