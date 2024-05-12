import jwt from 'jsonwebtoken'

const genAuthToken = (user) => {
  // const secretKey = 'yHt}enarsq8v{i-v~XMeA,nZ}zkaFO!7+Q2[MNG0'
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

// const token = genAuthToken({
//   _id: '654e2a8de82e996c3ba8dc51',
//   firstName: 'Bohdan',
//   secondName: 'Buchok',
//   email: 'bodianbuchok@gmail.com',
// })

// console.log(token)
