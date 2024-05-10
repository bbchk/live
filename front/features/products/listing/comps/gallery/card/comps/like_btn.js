import s from './like_btn.module.scss'
import lcs from '../listing_card.module.scss'
import { FavoriteBorderRounded, FavoriteRounded } from '@mui/icons-material'

const LikeButton = ({ isLiked }) => {
  return (
    <button
      className={`${s.like_button}`}
      //   onMouseDown={() => like(product._id)}
    >
      {isLiked ? (
        <FavoriteRounded className={`bi bi-heart-fill ${s.liked}`} />
      ) : (
        <FavoriteBorderRounded />
      )}
    </button>
  )
}

export default LikeButton
