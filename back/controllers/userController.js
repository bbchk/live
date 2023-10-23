const { parseCookies } = require("nookies");
const User = require("../models/user");
const Product = require("../models/product");
const jwt = require("jsonwebtoken");

const genAuthToken = require("../utils/genAuthToken");

const signIn = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.signIn(email, password);
    const token = genAuthToken(user);

    res.status(200).json({
      firstName: user.firstName,
      secondName: user.secondName,
      email: email,
      token: token,
      likedProducts: user.likedProducts,
    });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

const signUp = async (req, res) => {
  const { firstName, secondName, email, password } = req.body;

  try {
    const user = User.signUp(firstName, secondName, email, password);
    const token = createToken(user._id);
    res.status(200).json({
      firstName: user.firstName,
      secondName: user.secondName,
      email: email,
      token: token,
      likedProducts: user.likedProducts,
    });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};
const addLikedProduct = async (req, res) => {
  const { productId } = req.body;
  const userId = req.user._id;

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

const destroy = async (req, res) => {
  // const { id } = req.params;
  // const result = await getProductById(id);
  // if (result.error) {
  //   return res.status(result.status).json({ error: result.error });
  // }
  // await Product.deleteOne({ _id: id });
  // res.status(200).json(result.product);
  res.json({ mssg: "destroy" });
};

//todo delete this method after development
const deleteAllUsers = async (req, res) => {
  try {
    await User.deleteMany();
    res.status(200).json("All users is successfully deleted");
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

module.exports = { signIn, signUp, destroy, deleteAllUsers, addLikedProduct };
