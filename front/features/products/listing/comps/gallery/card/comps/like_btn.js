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
        <FavoriteRounded className={s.liked} />
      ) : (
        <FavoriteBorderRounded className={s.not_liked} />
      )}
      <div class={`${s.heart} ${product.isLiked ? s.liked : ''}`}></div>
    </button>
  )
}

export default LikeButton
