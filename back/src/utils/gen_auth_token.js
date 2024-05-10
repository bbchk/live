import jwt from 'jsonwebtoken'

const genAuthToken = (user) => {
  const secretKey =
    process.env.NODE_ENV !== 'production'
      ? process.env.TEST_JWT_SECRET
      : process.env.JWT_SECRET
  const token = jwt.sign(
    {
      _id: user._id,
      firstName: user.firstName,
      secondName: user.secondName,
      email: user.email,
    },
    secretKey,
  )

  return token
}

export default genAuthToken
