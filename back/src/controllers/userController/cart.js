import User from "#src/models/user.js";
import Product from "#src/models/product.js";

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
  const localStorageCartOptimized = req.body;

  try {
    let user = await User.findById(userId);

    localStorageCartOptimized.forEach((item) => {
      let cartItem = user?.cart.find(
        (cartItem) => cartItem.product.toString() === item.product
      );
      if (cartItem) {
        cartItem.quantity += Math.abs(cartItem.quantity - item.quantity);
      } else {
        user.cart.push({
          product: item.product,
          quantity: item.quantity,
        });
      }
    });

    await user.save();

    user = await user.populate({
      path: "cart.product",
      select: "name price images left",
    });

    res.status(200).json(user.cart);
  } catch (err) {
    console.log(err);
  }
};

export const fetchCart = async (req, res) => {
  const { userId } = req.params;

  try {
    let user = await User.findById(userId).populate({
      path: "cart.product",
      select: "name price images left",
    });

    res.status(200).json(user.cart);
  } catch (err) {
    console.log(err);
  }
};
