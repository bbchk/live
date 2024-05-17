import User from '#src/models/user.model.js'

export const sync = async (userId, cartToSync) => {
  //todo validate
  //todo validate schema of cartToSync {_id, quantity}

  let user = await User.findById(userId)

  for (let productToSync of cartToSync) {
    // Find the product in the user's cart
    let cartItem = user.cart.find(
      (item) => item.product.toString() === productToSync.product,
    )

    if (cartItem) {
      // If the product is found, increase the quantity
      cartItem.quantity += productToSync.quantity
    } else {
      // If the product is not found, add it to the cart
      user.cart.push(productToSync)
    }
  }

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
