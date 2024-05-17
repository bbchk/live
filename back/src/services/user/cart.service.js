import User from '#src/models/user.model.js'

export const sync = async (userId, cartToSync) => {
  //todo validate
  //todo validate schema of cartToSync {_id, quantity}

  console.log('🚀 ~ cartToSync:', cartToSync)

  let user = await User.findById(userId)

  const uniqueCartItemsToAdd = cartToSync
    .filter(
      (productToSync) =>
        user.cart.findIndex(
          (p) => p.product._id.toString() === productToSync._id,
        ) === -1,
    )
    .map((p) => {
      return { product: p }
    })

  console.log(user.cart)
  console.log(uniqueCartItemsToAdd)

  user.cart = [...user.cart, ...uniqueCartItemsToAdd]

  await user.save()
  user = await User.findById(userId).populate('cart.product._id')
  return user.cart
}

export const set = async (userId, cartToSet) => {
  //todo validate

  let user = await User.findById(userId)

  user.cart = cartToSet

  await user.save()
  user = await User.findById(userId).populate('cart.product._id')
  return user.cart
}
