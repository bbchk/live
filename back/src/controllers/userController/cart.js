import User from "#src/models/user.js";
import Product from "#src/models/product.js";

export const addToCart = async (req, res) => {
  const { userId, productId } = req.params;

  let user = await User.findById(userId);

  if (user?.cart) {
    let cartItem = user.cart.find(
      (item) => item.productId.toString() === productId
    );
    if (cartItem) {
      cartItem.quantity++;
    } else {
      user.cart.push({
        productId: productId,
        quantity: 1,
      });
    }
  } else {
    user.cart = [];
    user.cart.push({
      productId: productId,
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
        (cartItem) => cartItem._id.toString() === item._id.toString()
      );
      if (cartItem) {
        cartItem.quantity += Math.abs(cartItem.quantity - item.quantity);
      } else {
        user.cart.push({ productId: item._id, quantity: item.quantity });
      }
    });
  } else {
    user.cart = localStorageCart.map((item) => {
      return { productId: item._id, quantity: item.quantity };
    });
  }

  try {
    await user.save();

    const cartProductsIds = user.cart.map((item) => item.productId);
    let cartProducts = await Product.find({
      _id: { $in: cartProductsIds },
    })
      .select("name price images left")
      .exec();

    cartProducts = cartProducts.map((product) => {
      let cartProduct = user.cart.find(
        (item) => item.productId.toString() === product._id.toString()
      );
      return {
        ...product._doc,
        quantity: cartProduct.quantity,
      };
    });
    console.log("🚀 ~ cartProducts:", cartProducts);

    res.status(200).json(cartProducts);
  } catch (err) {
    console.log(err);
  }
};
