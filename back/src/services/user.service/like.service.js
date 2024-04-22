import User from "#src/models/user.js";

export const addLikedProduct = async (userId, product) => {
  return await User.updateOne(
    { _id: userId },
    { $push: { likedProducts: product } }
  );
};
