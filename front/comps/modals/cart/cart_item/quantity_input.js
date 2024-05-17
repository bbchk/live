import s from './quantity_input.module.scss'
import { AddRounded, RemoveRounded } from '@mui/icons-material'

const QuantityInput = ({ product, actions }) => {
  const [add, remove] = actions

  return (
    <div className={`${s.quantity_input}`}>
      <button
        disabled={product.quantity === 1}
        onClick={() => remove.call(product)}
      >
        <RemoveRounded />
      </button>

      <input type='text' value={product.quantity} readOnly disabled />

      <button onClick={() => add.call(product)}>
        <AddRounded />
      </button>
    </div>
  )
}

export default QuantityInput
