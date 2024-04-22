import user from "#src/models/user.js";
import * as authService from "#src/services/user.service/auth.service.js";

export const signIn = async (req, res) => {
  const { email, password } = req.body;
  try {
    const { user, token } = await authService.signIn(email, password);
    console.log("🚀 ~ user:", user);
    res.status(200).json({
      id: user._id,
      firstName: user.firstName,
      secondName: user.secondName,
      email: email,
      token: token,
      likedProducts: user.likedProducts,
      cart: user.cart,
      image: user.image,
    });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

export const signUp = async (req, res) => {
  const user = { ...req.body };
  try {
    const newUser = await authService.signUp(user);

    res.status(200).json({
      ...newUser,
    });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};
