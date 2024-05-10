import s from './star_rating.module.scss';
import { useId } from 'react';

import StarIcon from './star_icon';

const StarRating = ({ rating }) => {
  const id = useId();

  return (
    <div className={`${s.stars}`}>
      {[1, 2, 3, 4, 5].map((star, index) => {
        const diff = star - rating;
        let starValue = diff < 0 ? 1 : 1 - diff;

        return (
          <StarIcon key={index} id={`${id}-${index}`} starValue={starValue} />
        );
      })}
    </div>
  );
};

export default StarRating;
