import s from './cart_modal.module.scss'
import ms from 'comps/modals/modal.module.scss'

import {
  Dialog,
  DialogTitle,
  DialogContent,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import { useSelector, useDispatch } from 'react-redux'
import {
  toggle,
  GLOBAL_COMPS,
} from 'store/slices/global_comps/global_comps.slice'
const { CART_MODAL, SIGN_IN_MODAL } = GLOBAL_COMPS

import CartItem from './cart_item/cart_item'
import Image from 'next/image'

import { useCart } from '#root/hooks/use_cart.js'
import { useSession } from 'next-auth/react'
import axios from 'axios'
import { useRouter } from 'next/router'
import { balsamiqSans } from '#root/pages/_app.js'

const CartModal = () => {
  const router = useRouter()
  const dispatch = useDispatch()
  const { cartModalOpen } = useSelector((state) => state.modals)

  const { data: session } = useSession()

  const [cart, add, remove, removeAll] = useCart()
  const { items, totalCost } = cart

  async function handleBuy() {
    if (!session) {
      dispatch(toggle(CART_MODAL))
      dispatch(toggle(SIGN_IN_MODAL))
    }

    const authHeader = {
      Authorization: `Bearer ${session.user.token}`,
    }

    try {
      const response = await axios({
        method: 'post',
        url: `/user/cart/${session.user.id}/checkout`,
        headers: authHeader,
      })

      router.push(response.data.url)
    } catch (e) {
      console.log(e)
    }
  }

  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'))

  return (
    <Dialog
      open={cartModalOpen}
      onClose={() => dispatch(toggle(CART_MODAL))}
      fullWidth
      maxWidth='lg'
      fullScreen={fullScreen}
    >
      <DialogTitle className={`${ms.header} ${balsamiqSans.className}`}>
        Кошик покупок
      </DialogTitle>
      <DialogContent className={`${s.body} ${balsamiqSans.className}`}>
        {items?.length === 0 ? (
          <div>
            <Image
              src='/assets/empty_cart.svg'
              alt='Empty cart'
              width={200}
              height={200}
            />
            <p>Кошик поки що порожній</p>
          </div>
        ) : (
          <>
            {items?.map((product) => (
              <CartItem
                key={product._id}
                product={product}
                actions={[add, remove, removeAll]}
              />
            ))}

            <footer>
              <p className={`${s.total_cost} price`}>
                <span>{`Всього:`}</span>
                {totalCost}
                <span>₴</span>
              </p>

              <menu className={`${s.controls}`}>
                <li>
                  <button
                    className={`button_primary`}
                    onClick={() => dispatch(toggle(CART_MODAL))}
                  >
                    Продовжити покупки
                  </button>
                </li>

                <li>
                  <button
                    className={`button_submit ${s.order_btn}`}
                    onClick={handleBuy}
                  >
                    Оформити замовлення
                  </button>
                </li>
              </menu>
            </footer>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}

export default CartModal
