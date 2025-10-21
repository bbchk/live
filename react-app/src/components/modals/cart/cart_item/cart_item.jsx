import Image from 'next/image'
import s from './cart_item.module.scss'

import { DeleteOutlineRounded } from '@mui/icons-material'

import QuantityInput from './quantity_input'

const CartItem = ({ product, actions }) => {
  const [, , removeAll] = actions
  return (
    <div className={`${s.cart_item}`}>
      <div>
        <Image
          src={product.images ? product.images[0] : '/images/placeholder.png'}
          alt='Picture of the product'
          width={250}
          height={250}
          priority
        />
        <p>{product.name}</p>
        <button
          onClick={() => {
            removeAll.call(product)
          }}
        >
          <DeleteOutlineRounded />
        </button>
      </div>
      <div>
        <div className={` ${s.quantity_input}`}>
          <QuantityInput product={product} actions={actions} />
        </div>
        <p className={`price ${s.price}`}>
          {product.price * product.quantity}
          <span>₴</span>
        </p>
      </div>
    </div>
  )
}

export default CartItem
