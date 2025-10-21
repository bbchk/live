import s from './review_item.module.scss'
import StarRating from 'comps/rating/star_rating'
import ThumbUpIcon from '@mui/icons-material/ThumbUp'
import ThumbDownIcon from '@mui/icons-material/ThumbDown'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import ReplyIcon from '@mui/icons-material/Reply'

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
          <ReplyIcon style={{ transform: 'rotate(90deg)' }} />
          <p>Відповісти</p>
        </button>
        <div className={`${s.controls}`}>
          <button className={`${s.like_btn}`}>
            <ThumbUpIcon />
          </button>
          <p>{likes}</p>
          <button className={`${s.dislike_btn}`}>
            <ThumbDownIcon style={{ transform: 'scaleX(-1)' }} />
          </button>
          <p>{dislikes}</p>
          <button disabled className={`${s.options_btn}`}>
            <MoreVertIcon />
          </button>
        </div>
      </footer>
    </div>
  )
}

export default ReviewItem
