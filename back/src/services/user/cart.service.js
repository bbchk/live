import User from '#src/models/user.model.js'
import Stripe from 'stripe'
const stripe = new Stripe(process.env.SECRET_KEY)

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

export const checkout = async (userId) => {
  //todo validate

  let user = await User.findById(userId)
    .populate('cart.product', 'name price images starRating left')
    .exec()

  const cart = user.cart

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    mode: 'payment',
    line_items: cart.map(({ product, quantity }) => {
      return {
        price_data: {
          currency: 'uah',
          product_data: {
            name: product.name,
          },
          unit_amount: product.price * 100,
        },
        quantity: quantity,
      }
    }),
    success_url: `${process.env.FRONT_DOMAIN}/payment/success`,
    cancel_url: `${process.env.FRONT_DOMAIN}/payment/cancel`,
  })

  return session
}
