import s from './like_btn.module.scss'

import { FavoriteBorderRounded, FavoriteRounded } from '@mui/icons-material'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addToWishList, removeFromWishList } from 'store/slices/user.slice'

const LikeButton = ({ product }) => {
  return (
    <button className={`${s.like_button}`} onMouseDown={() => product.like()}>
      {product.isLiked ? (
        <FavoriteRounded className={`bi bi-heart-fill ${s.liked}`} />
      ) : (
        <FavoriteBorderRounded />
      )}
    </button>
  )
}

export default LikeButton
