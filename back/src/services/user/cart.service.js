import User from '#src/models/user.model.js'

export const sync = async (userId, cartToSync) => {
  //todo validate
  //todo validate schema of cartToSync {_id, quantity}

  let user = await User.findById(userId)

  //todo if duplicate found, add quantity
  const uniqueCartItemsToAdd = cartToSync.filter(
    (productToSync) =>
      user.cart.findIndex(
        (item) => item.product.toString() === productToSync.product,
      ) === -1,
  )

  user.cart = [...user.cart, ...uniqueCartItemsToAdd]

  await user.save()
  user = await User.findById(userId)
    .populate('cart.product', 'name price images starRating left')
    .exec()

  return user.cart
}

export const set = async (userId, cartToSet) => {
  //todo validate

  let user = await User.findById(userId)

  user.cart = cartToSet

  await user.save()
  user = await User.findById(userId)
    .populate('cart.product', 'name price images starRating left')
    .exec()

  return user.cart
}
