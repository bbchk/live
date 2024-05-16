import s from './landing_product_about.module.scss'

import ProductMainInfo from './comps/product_details/product_main_info'
import ProductFigure from './comps/product_figure'
import Description from './comps/description'
import Characteristics from '../mutual/characteristics'
import Reviews from './comps/reviews'
import RecsCarousel from './comps/recs_carousel'

const LandingProductAboutPage = ({ product }) => {
  return (
    <article className={`${s.landing_product_about}`}>
      <div className={`${s.product_figure}`}>
        <ProductFigure images={product.images} />
      </div>
      <div className={`${s.product_main_info}`}>
        <ProductMainInfo product={product} />
      </div>

      <div className={`${s.descriptionAndCharacteristics}`}>
        <Description product={product} />

        <Characteristics title={'Характеристики:'} product={product} />
      </div>

      <div className={`${s.reviews}`}>
        <Reviews product={product} />
      </div>
      <div className={`${s.recs}`}>
        <RecsCarousel />
      </div>
    </article>
  )
}

export default LandingProductAboutPage
