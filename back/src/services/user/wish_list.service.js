import User from '#src/models/user.model.js'

export const sync = async (userId, wishList) => {
  let user = await User.findById(userId)
  user.wishList = [...new Set([...user.wishList, ...wishList])]

  await user.save()
  return user.wishList
}

export const add = async (userId, productId) => {
  let user = await User.findById(userId)
  user.wishList = [...user.wishList, productId]
  await user.save()
}

export const remove = async (userId, productId) => {
  let user = await User.findById(userId)
  user.wishList = user.wishList.filter((id) => id !== productId)
  await user.save()
}
