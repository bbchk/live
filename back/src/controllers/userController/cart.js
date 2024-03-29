import User from "#src/models/user.js";
import Product from "#src/models/product.js";

export const addCartItem = async (req, res) => {
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

// Function to decrement the quantity of a cart item
export const deleteCartItem = async (req, res) => {
  const { userId, productId } = req.params;

  try {
    let user = await User.findById(userId);

    if (user?.cart) {
      let cartItem = user.cart.find(
        (item) => item.product.toString() === productId
      );

      if (cartItem && cartItem.quantity > 1) {
        cartItem.quantity--;
      } else if (cartItem) {
        user.cart = user.cart.filter(
          (item) => item.product.toString() !== productId
        );
      }
    }

    await user.save();
    console.log("Cart item quantity decremented successfully");
    res.status(200).json({
      message: `Quantity of product ${productId} decreased by one.`,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error updating product quantity" });
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

export const getCart = async (req, res) => {
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
