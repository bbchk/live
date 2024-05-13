import s from './like_btn.module.scss'

import { FavoriteBorderRounded, FavoriteRounded } from '@mui/icons-material'

const LikeButton = ({ product }) => {
  return (
    <button
      className={`${s.like_button}`}
      onClick={() => product.like()}
      aria-label='Додати до списку бажаних товарів'
    >
      {product.isLiked ? (
        <FavoriteRounded className={`bi bi-heart-fill ${s.liked}`} />
      ) : (
        <FavoriteBorderRounded />
      )}
    </button>
  )
}

export default LikeButton
