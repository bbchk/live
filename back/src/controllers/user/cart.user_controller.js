import * as cartService from "#src/services/user/cart.service.js";
import { asyncErrorHandler } from "#src/utils/async_error_handler.js";

export const addCartItem = asyncErrorHandler(async (req, res, next) => {
  const { userId, productId } = req.params;
  try {
    await cartService.addCartItem(userId, productId);
    res.status(200).json({
      message: `Product ${productId} added to the cart successfully.`,
    });
  } catch (err) {
    console.log(err);
  }
});

export const deleteCartItem = asyncErrorHandler(async (req, res, next) => {
  const { userId, productId } = req.params;

  await cartService.deleteCartItem(userId, productId);
  res.status(200).json({
    message: `Quantity of product ${productId} decreased by one.`,
  });
});

export const syncCart = asyncErrorHandler(async (req, res, next) => {
  const { userId } = req.params;
  const localStorageCartOptimized = req.body;

  const userCart = await cartService.syncCart(
    userId,
    localStorageCartOptimized
  );
  res.status(200).json(userCart);
});

export const getCart = asyncErrorHandler(async (req, res, next) => {
  const { userId } = req.params;

  const userCart = await cartService.getCart(userId);
  res.status(200).json(userCart);
});
