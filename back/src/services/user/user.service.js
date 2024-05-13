import _Error from '#src/utils/error.js'
import bcrypt from 'bcryptjs'
// const a = await bcrypt.hash('flco7G90cy#BK8HpAJQ5t5JHLWu9q&8JCe', 10)
// console.log(a)
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
  const { password, oldPassword } = updatedData

  if (password && !oldPassword) {
    throw new _Error('Введіть старий пароль', 400)
  }

  if (!password && oldPassword) {
    throw new _Error('Введіть новий пароль', 400)
  }

  if (password && oldPassword) {
    let user = await User.findById(userId)

    const match = await bcrypt.compare(oldPassword, user.password)
    if (!match) {
      throw new _Error('Старий пароль не є правильним', 401)
    }
    updatedData.password = await bcrypt.hash(password, 10)
  }

  const user = await User.findByIdAndUpdate(userId, updatedData, {
    new: true,
  })
  return user
}
