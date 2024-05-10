import User from '#src/models/user.model.js'

export const addCartItem = async (userId, productId) => {
  let user = await User.findById(userId)
  if (user?.cart) {
    let cartItem = user.cart.find(
      (item) => item.product.toString() === productId,
    )
    if (cartItem) {
      cartItem.quantity++
    } else {
      user.cart.push({
        product: productId,
        quantity: 1,
      })
    }
  } else {
    user.cart = []
    user.cart.push({
      product: productId,
      quantity: 1,
    })
  }
  return await user.save()
}

export const deleteCartItem = async (userId, productId) => {
  let user = await User.findById(userId)
  if (user?.cart) {
    let cartItem = user.cart.find(
      (item) => item.product.toString() === productId,
    )
    if (cartItem && cartItem.quantity > 1) {
      cartItem.quantity--
    } else if (cartItem) {
      user.cart = user.cart.filter(
        (item) => item.product.toString() !== productId,
      )
    }
  }
  return await user.save()
}

export const syncCart = async (userId, localStorageCartOptimized) => {
  let user = await User.findById(userId)
  localStorageCartOptimized.forEach((item) => {
    let cartItem = user?.cart.find(
      (cartItem) => cartItem.product.toString() === item.product,
    )
    if (cartItem) {
      cartItem.quantity += Math.abs(cartItem.quantity - item.quantity)
    } else {
      user.cart.push({
        product: item.product,
        quantity: item.quantity,
      })
    }
  })
  await user.save()
  return await user.populate({
    path: 'cart.product',
    select: 'name price images left',
  })
}

export const getCart = async (userId) => {
  let user = await User.findById(userId)
  return await user.populate({
    path: 'cart.product',
    select: 'name price images left',
  })
}
