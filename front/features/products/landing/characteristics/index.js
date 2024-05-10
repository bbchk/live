import Characteristics from 'features/products/landing/mutual/characteristics';
import SmallCard from './small_card';
import SmallBuyArea from './small_buy_area';

import DecorLine from 'comps/decor/decor_line';

//todo add Head like in about page
const ProductCharacteristics = ({ product }) => {
  return (
    <article>
      <DecorLine />
      <div className="container">
        <div className="d-flex justify-content-between">
          <Characteristics
            title={`Характеристики ${product.name}`}
            product={product}
          />
          <div className="d-flex flex-column gap-2">
            <SmallCard product={product} />
            <SmallBuyArea product={product} />
          </div>
        </div>
      </div>
    </article>
  );
};

export default ProductCharacteristics;
