import genAuthToken from '#src/utils/gen_auth_token.js'

const admin = {
  _id: '654e2a8de82e996c3ba8dc51',
  firstName: 'first',
  secondName: 'second',
  email: 'example@gmail.com',
}

export const adminToken = genAuthToken(admin)
