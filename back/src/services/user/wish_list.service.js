import User from '#src/models/user.model.js'

export const sync = async (userId, wishList) => {
  let user = await User.findById(userId)
  user.wishList = [...new Set([...user.wishList, ...wishList])]

  await user.save()
  return user.wishList
}
