import s from './buy_info.module.scss'
import lcs from '../listing_card.module.scss'
import { AddShoppingCartRounded } from '@mui/icons-material'

const BuyInfo = ({ product }) => {
  return (
    <section className={`${s.buy_info} ${lcs.buy_info}`}>
      <p className={`${s.price}`}>
        {product.price} <span>₴</span>
      </p>

      <button
        className={`${s.add_to_cart_button}`}
        aria-label='Додати до кошику покупок'
      >
        <AddShoppingCartRounded />
      </button>
    </section>
  )
}

export default BuyInfo
