import s from './quantity_input.module.scss'
import { AddRounded, RemoveRounded } from '@mui/icons-material'

const QuantityInput = ({ product, actions }) => {
  const [add, remove] = actions

  return (
    <div className={`${s.quantity_input}`}>
      <button
        tabIndex={0}
        disabled={product.quantity === 1}
        onClick={() => remove.call(product)}
        aria-label={'Видалити одиницю товару з кошика'}
      >
        <RemoveRounded />
      </button>

      <input type='text' value={product.quantity} readOnly disabled />

      <button
        onClick={() => add.call(product)}
        aria-label='Додати одиницю товару в кошик'
      >
        <AddRounded />
      </button>
    </div>
  )
}

export default QuantityInput
