import s from './product_main_info.module.scss'

import { useState } from 'react'
import MainInfoHeader from './info_header'
import InfoBody from './info_body'

const ProductMainInfo = ({ product }) => {
  return (
    <main className={`${s.main_info}`}>
      <MainInfoHeader product={product} />
      <InfoBody product={product} />
    </main>
  )
}

export default ProductMainInfo
