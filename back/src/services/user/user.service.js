import _Error from '#src/utils/error.js'
import bcrypt from 'bcryptjs'
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
  const { password, oldPasword } = updatedData

  if (password && oldPasword) {
    let user = await User.findById(userId)

    const match = await bcrypt.compare(oldPasword, user.password)
    if (!match) {
      throw new _Error(`Старий пароль не є правильним`, 404)
    }
    updatedData.password = await bcrypt.hash(password, 10)
  }

  try {
    const user = await User.findByIdAndUpdate(userId, updatedData, {
      new: true,
    })
    return user
  } catch (error) {
    throw error
  }
}
