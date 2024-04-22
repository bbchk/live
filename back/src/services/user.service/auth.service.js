import User from "#src/models/user.js";
import genAuthToken from "#src/utils/genAuthToken.js";

export const signIn = async (email, password) => {
  const user = await User.signIn(email, password);
  console.log("🚀 ~ user:", user);
  const token = genAuthToken(user);
  return { user, token };
};

export const signUp = async (user) => {
  const newUser = await User.signUp(user);

  const token = genAuthToken(newUser._id);
  return { ...newUser, token };
};
