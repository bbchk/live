import User from "#src/models/user.js";

export const addToCart = async (req, res) => {
  const { userId, productId } = req.params;

  let user = await User.findById(userId);

  if (user?.cart) {
    let cartItem = user.cart.find(
      (item) => item.product.toString() === productId
    );
    if (cartItem) {
      cartItem.quantity++;
    } else {
      user.cart.push({
        product: productId,
        quantity: 1,
      });
    }
  } else {
    user.cart = [];
    user.cart.push({
      product: productId,
      quantity: 1,
    });
  }

  try {
    await user.save();
    console.log("Cart updated successfully");
    res.status(200).json({
      message: `Product ${productId} added to the cart successfully.`,
    });
  } catch (err) {
    console.log(err);
  }
};

export const syncCart = async (req, res) => {
  const { userId } = req.params;
  const localStorageCart = req.body;
  console.log("🚀 ~ localStorageCart:", localStorageCart);

  let user = await User.findById(userId);
  console.log(user.cart);

  //todo intersect carts
  if (user?.cart) {
    localStorageCart.forEach((item) => {
      let cartItem = user.cart.find(
        (cartItem) => cartItem.productId.toString() === item.productId
      );
      if (cartItem) {
        cartItem.quantity += item.quantity;
      } else {
        user.cart.push(item);
      }
    });
  } else {
    user.cart = localStorageCart;
  }

  try {
    await user.save();
    res.status(200).json({
      message: `Carts synced successfully.`,
    });
  } catch (err) {
    console.log(err);
  }
};
