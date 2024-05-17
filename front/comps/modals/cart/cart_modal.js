import { Modal } from 'react-bootstrap'
import s from './cart_modal.module.scss'

import { useDispatch, useSelector } from 'react-redux'
import {
  toggle,
  GLOBAL_COMPS,
} from 'store/slices/global_comps/global_comps.slice'
const { CART_MODAL } = GLOBAL_COMPS

import { balsamiqSans } from 'pages/_app'

import { useEffect, useMemo, useRef, useState } from 'react'

import CartItem from './cart_item/cart_item'
import Image from 'next/image'

import useTabTrap from 'comps/accessibility/hooks/useTabbingTrap'
import { useCart } from '#root/hooks/use_cart.js'
import { useSession } from 'next-auth/react'
import axios from 'axios'
import { useRouter } from 'next/router'

const CartModal = () => {
  const router = useRouter()
  const dispatch = useDispatch()
  const { cartModalOpen } = useSelector((state) => state.modals)

  const { data: session } = useSession()

  useTabTrap(cartModalOpen, 'cartModal')

  const [cart, add, remove, removeAll] = useCart()
  const { items, totalCost } = cart

  async function handleBuy() {
    // if (!session) return //todo close cart and show sign in

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

  return (
    <Modal
      id='cartModal'
      show={cartModalOpen}
      onHide={() => dispatch(toggle(CART_MODAL))}
      centered
      fullscreen='lg-down'
      size='xl'
      className={`${s.modal} ${balsamiqSans.className}`}
    >
      <Modal.Header closeButton={true} className={`${s.modal_header}`}>
        <h3>Кошик покупок</h3>
      </Modal.Header>
      <Modal.Body className={`${s.modal_body}`}>
        {items?.length === 0 ? (
          <div className={`${s.empty_cart}`}>
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
            {items?.map((product) => {
              return (
                <CartItem
                  key={product._id}
                  product={product}
                  actions={[add, remove, removeAll]}
                />
              )
            })}

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
      </Modal.Body>
    </Modal>
  )
}

export default CartModal
