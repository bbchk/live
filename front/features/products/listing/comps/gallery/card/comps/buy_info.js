import s from './buy_info.module.scss'
import lcs from '../listing_card.module.scss'
import {
  AddShoppingCartRounded,
  ShoppingCartRounded,
} from '@mui/icons-material'

const BuyInfo = ({ product }) => {
  return (
    <section className={`${s.buy_info} ${lcs.buy_info}`}>
      <p className={`${s.price}`}>
        {product.price} <span>₴</span>
      </p>

      <button
        className={`${s.add_to_cart_button}`}
        aria-label='Додати товар до кошику покупок'
        onClick={() => product.add()}
      >
        {product.inCart ? (
          <ShoppingCartRounded className={s.in_cart} />
        ) : (
          <AddShoppingCartRounded className={s.not_in_cart} />
        )}
      </button>
    </section>
  )
}

export default BuyInfo
