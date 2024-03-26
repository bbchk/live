import User from "#src/models/user.js";

//todo test and fix this
export const addLikedProduct = async (req, res) => {
  const { userId } = req.query;
  const product = req.body;

  try {
    await User.updateOne(
      { _id: userId },
      { $push: { likedProducts: productId } }
    );
    res.status(200).json({ message: "Product liked successfully." });
  } catch (err) {
    console.error(`error: ${err}`);
    res
      .status(500)
      .json({ error: "An error occurred while liking the product." });
  }
};
