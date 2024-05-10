import s from './review_item.module.scss'
import StarRating from 'comps/rating/star_rating'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faEllipsisVertical,
  faArrowTurnUp,
} from '@fortawesome/free-solid-svg-icons'
import { faThumbsUp, faThumbsDown } from '@fortawesome/free-regular-svg-icons'

const ReviewItem = ({ review }) => {
  const {
    id,
    starRating,
    cons,
    pros,
    comment,
    date,
    author,
    likes,
    dislikes,
    subreviews,
  } = review

  return (
    <div className={`${s.review_item}`}>
      <header className={`${s.header}`}>
        <p>{author}</p>
        <p>{date}</p>
      </header>
      <div className={`${s.body}`}>
        <StarRating rating={starRating} />
        <p className={`${s.comment}`}>{comment}</p>
        {pros.length > 0 && (
          <p className={`${s.pros}`}>
            <span>Переваги:</span> {pros}
          </p>
        )}
        {cons.length > 0 && (
          <p className={`${s.cons}`}>
            <span>Недоліки:</span> {cons}
          </p>
        )}
      </div>

      <footer className={`${s.footer}`}>
        <button className={`${s.subreply_btn}`} disabled>
          <FontAwesomeIcon icon={faArrowTurnUp} transform={{ rotate: 90 }} />
          <p>Відповісти</p>
        </button>
        <div className={`${s.controls}`}>
          <button className={`${s.like_btn}`}>
            <FontAwesomeIcon icon={faThumbsUp} />
          </button>
          <p>{likes}</p>
          <button className={`${s.dislike_btn}`}>
            <FontAwesomeIcon icon={faThumbsDown} transform={{ flipX: true }} />
          </button>
          <p>{dislikes}</p>
          <button disabled className={`${s.options_btn}`}>
            <FontAwesomeIcon icon={faEllipsisVertical} />
          </button>
        </div>
      </footer>
    </div>
  )
}

export default ReviewItem
