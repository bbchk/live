import * as cartService from "#src/services/user/cart.service.js";

export const addCartItem = async (req, res) => {
  const { userId, productId } = req.params;
  try {
    await cartService.addCartItem(userId, productId);
    res.status(200).json({
      message: `Product ${productId} added to the cart successfully.`,
    });
  } catch (err) {
    console.log(err);
  }
};

export const deleteCartItem = async (req, res) => {
  const { userId, productId } = req.params;
  try {
    await cartService.deleteCartItem(userId, productId);
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
  console.log("🚀 ~ localStorageCartOptimized:", localStorageCartOptimized);
  try {
    const userCart = await cartService.syncCart(
      userId,
      localStorageCartOptimized
    );
    console.log("🚀 ~ userCart:", userCart);
    res.status(200).json(userCart);
  } catch (err) {
    console.log(err);
  }
};

export const getCart = async (req, res) => {
  const { userId } = req.params;
  try {
    const userCart = await cartService.getCart(userId);
    res.status(200).json(userCart);
  } catch (err) {
    console.log(err);
  }
};
