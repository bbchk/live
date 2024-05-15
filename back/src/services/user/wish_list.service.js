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

// import User from '#src/models/user.model.js'

// export const sync = async (userId, wishListToSync) => {
//   //todo validate

//   const currentWishList = (await User.findById(userId)).wishList.map((id) =>
//     id.toString(),
//   )
//   const newWishList = [...new Set([...currentWishList, ...wishListToSync])]

//   console.log('sync')

//   const user = await User.findOneAndUpdate(
//     { _id: userId },
//     { wishList: newWishList },
//     { new: true }, // This option ensures that the updated document is returned
//   )

//   return user.wishList
// }

// export const set = async (userId, wishListToSync) => {
//   //todo validate

//   console.log('set')

//   const user = await User.findOneAndUpdate(
//     { _id: userId },
//     { wishList: wishListToSync },
//     { new: true }, // This option ensures that the updated document is returned
//   )

//   return user.wishList
// }
