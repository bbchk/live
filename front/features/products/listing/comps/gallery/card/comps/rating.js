import Link from 'next/link'
import s from './rating.module.scss'
import lcs from '../listing_card.module.scss'
import Image from 'next/image'
import StarRating from 'comps/rating/star_rating'
import { useDispatch } from 'react-redux'
import { startLoading } from 'store/slices/global_comps/global_comps.slice'

import { ChatRounded } from '@mui/icons-material'

//use rating from product
const ProductRating = ({ product: { starRating, reviews }, productUrl }) => {
  return (
    <section className={` ${lcs.rating}`}>
      <Link
        aria-label='Перейти до оцінок та відгуків товару'
        className={`${s.rating}`}
        href={productUrl('characteristics')}
        onClick={() => dispatch(startLoading())}
      >
        <StarRating rating={starRating} />
        <ChatRounded className={`${s.chat_icon}`} />
        <p>{10}</p>
      </Link>
    </section>
  )
}

export default ProductRating
