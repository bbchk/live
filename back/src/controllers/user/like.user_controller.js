import * as userService from "#src/services/user/like.service.js";

export const addLikedProduct = async (req, res) => {
  const { userId } = req.query;
  const product = req.body;

  try {
    await userService.addLikedProduct(userId, product);
    res.status(200).json({ message: "Product liked successfully." });
  } catch (err) {
    console.error(`error: ${err}`);
    res
      .status(500)
      .json({ error: "An error occurred while liking the product." });
  }
};
