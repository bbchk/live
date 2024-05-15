import User from '#src/models/user.model.js'

export const sync = async (userId, wishListToSync) => {
  //todo validate

  let user = await User.findById(userId)
  const currentWishList = user.wishList.map((id) => id.toString())

  user.wishList = [...new Set([...currentWishList, ...wishListToSync])]

  await user.save()
  return user.wishList
}

export const set = async (userId, wishListToSync) => {
  //todo validate

  let user = await User.findById(userId)

  user.wishList = wishListToSync

  await user.save()
  return user.wishList
}

// export const sync = async (userId, wishListToSync) => {
//   let user = await User.findById(userId)
//   const currentWishList = user.wishList.map((id) => id.toString())

//   // Filter out the items in user.wishList that are not present in wishListToSync
//   user.wishList = currentWishList.filter((id) => wishListToSync.includes(id))

//   await user.save()
//   return user.wishList
// }
