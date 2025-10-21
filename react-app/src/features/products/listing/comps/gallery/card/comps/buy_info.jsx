import s from './buy_info.module.scss'
import lcs from '../listing_card.module.scss'
import {
  AddShoppingCartRounded,
  ShoppingCartRounded,
} from '@mui/icons-material'
import { useDispatch } from 'react-redux'
import {
  toggle,
  GLOBAL_COMPS,
} from 'store/slices/global_comps/global_comps.slice'
const { CART_MODAL } = GLOBAL_COMPS

const BuyInfo = ({ product }) => {
  const dispatch = useDispatch()

  const handleOnClick = () => {
    if (product.inCart) {
      dispatch(toggle(CART_MODAL))
    } else {
      product.add()
    }
  }

  return (
    <section className={`${s.buy_info} ${lcs.buy_info}`}>
      <p className={`${s.price}`}>
        {product.price} <span>₴</span>
      </p>

      <button
        className={`${s.add_to_cart_button}`}
        aria-label={
          product.inCart
            ? 'Товар уже у кошику'
            : 'Додати товар до кошику покупок'
        }
        aria-description={
          product.inCart ? 'Відкрити вікно кошику покупок' : undefined
        }
        onClick={handleOnClick}
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
