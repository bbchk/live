import { useEffect, useState } from 'react'
import s from './gallery.module.scss'
import ProductCard from 'features/products/listing/comps/gallery/card/listing_card.js'
import axios from 'axios'
import { useWishList } from '#root/hooks/useWishList.js'
import useFetchLikedProducts from './use_fetch_wish_list.hook.js'

//create loading component to handle loading of liked products
const WishListGallery = () => {
  const [wshl, like] = useWishList()
  const likedProducts = useFetchLikedProducts(wshl)

  return (
    <>
      {likedProducts && (
        <div
          className={`container row row-cols-xs-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-4 ${s.gallery} `}
        >
          {likedProducts.map((product) => {
            product.isLiked = wshl.includes(product._id)
            product.like = like
            return (
              <div key={product._id} className={`col ${s.col}`}>
                <ProductCard product={product} priority={true} />
              </div>
            )
          })}
        </div>
      )}
    </>
  )
}

export default WishListGallery
