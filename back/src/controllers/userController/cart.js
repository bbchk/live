import User from "#src/models/user.js";

export const addToCart = async (req, res) => {
  const { userId, productId } = req.params;

  let user = await User.findById(userId);

  if (!user?.cart) {
    user.cart = [];
  }

  let cartItem = user.cart.find(
    (item) => item.product.toString() === productId
  );

  if (cartItem) {
    cartItem.quantity++;
  } else {
    let newCartItem = {
      product: productId,
      quantity: 1,
    };
    user.cart.push(newCartItem);
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
