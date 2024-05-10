import ImageFallback from '#root/comps/image/fallback_image.js';
import s from './small_card.module.scss';
import Image from 'next/image';

const Small_Card = ({ product: { images, name } }) => {
  return (
    <div className={`${s.small_card} `}>
      <ImageFallback
        src={images && images[0]}
        fallbackSrc={'/assets/goods_placeholder.svg'}
        alt="Picture of the product"
        width={500}
        height={500}
        className={`${s.image}`}
      />

      <p className={`${s.name}`}>{name}</p>
    </div>
  );
};

export default Small_Card;
