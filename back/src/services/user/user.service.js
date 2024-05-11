import User from '#src/models/user.model.js'
import genAuthToken from '#src/utils/gen_auth_token.js'

export const signIn = async (email, password) => {
  const user = await User.signIn(email, password)
  const token = genAuthToken(user)
  return { user, token }
}

export const signUp = async (user) => {
  const newUser = await User.signUp(user)

  const token = genAuthToken(newUser._id)
  return { ...newUser, token }
}

export const update = async (userId, updatedData) => {
  try {
    const user = await User.findByIdAndUpdate(userId, updatedData, {
      new: true,
    })
    return user
  } catch (error) {
    throw error
  }
}
