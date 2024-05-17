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

export const checkout = async (userId) => {
  //todo validate

  let user = await User.findById(userId)

  // user.cart

  const storeItems = new Map([
    [1, { price: 20000, name: 'Item 1' }],
    [2, { price: 10000, name: 'Item 2' }],
  ])
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    mode: 'payment',
    line_items: req.body.items.map((item) => {
      const storeItem = storeItems.get(item.id)
      return {
        price_data: {
          currency: 'uah',
          product_data: {
            name: storeItem.name,
          },
          unit_amount: storeItem.price,
        },
        quantity: item.quantity,
      }
    }),
    success_url: `${process.env.SERVER_URL}/success.html`,
    cancel_url: `${process.env.SERVER_URL}/cancel.html`,
  })
  res.json({ url: session.url })

  // await user.save()
  // user = await User.findById(userId)
  //   .populate('cart.product', 'name price images starRating left')
  //   .exec()

  // return user.cart
  return null
}
