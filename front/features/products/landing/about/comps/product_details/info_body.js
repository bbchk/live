import s from './info_body.module.scss';
import { useSession } from 'next-auth/react';
import { useCart } from 'hooks/useCart';

// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faHeart } from "@fortawesome/free-regular-svg-icons";
// import { faMessage } from "@fortawesome/free-regular-svg-icons";
// import { useRouter } from "next/router";

import {
  AddShoppingCartRounded,
  FavoriteBorderRounded,
  ChatRounded,
} from '@mui/icons-material';

const InfoBody = ({ product }) => {
  const {
    brand,
    name,
    category,
    price,
    description,
    images,
    weight,
    left,
    reviews = ['good', 'bad', 'good', 'bad', 'good', 'bad'],
    starRating = 3.7,
    packing,
    code = '000000',
  } = product;

  const { add } = useCart();
  function handleBuy(product) {
    add(product);
  }

  return (
    <div className={`${s.buy_area}`}>
      <div className={`${s.price}`}>
        <p>
          {price}
          <span className={`${s.currency}`}> ₴ </span>
        </p>
        <p className={`${s.is_left}`}>
          {left > 0 ? 'Є в наявності' : 'Немає в наявності'}{' '}
        </p>
      </div>

      <button
        className={`button_primary ${s.buy_btn}`}
        onClick={() => handleBuy(product)}
      >
        <p>Купити</p>
        <AddShoppingCartRounded className="icon_button_on_hover" />
      </button>

      <button className={`${s.like_btn} icon_button_primary`}>
        <FavoriteBorderRounded className="icon_button_on_hover" />
      </button>

      <button
        className={`${s.comment_btn} icon_button_primary`}
        onClick={() => {
          // router.push(router.asPath + "#write_review_button", undefined, {
          //   shallow: true,
          // });
        }}
      >
        <ChatRounded className="icon_button_on_hover" />
      </button>
    </div>
  );
};

export default InfoBody;
