import supertest from 'supertest'
import app from '@src/app.js'
import jwt from 'jsonwebtoken' // Import jsonwebtoken library

import { setupDB, teardownDB } from '#src/__tests__/in_memory_db/db_utils.js'
import { randomUser } from '#src/__tests__/utils/data_generator.js'

beforeAll(async function () {
  await setupDB()
})
afterAll(async function () {
  await teardownDB()
})

describe('AUTH /user', () => {
  it('should successfully sign in a user with valid credentials', async () => {
    const usr = randomUser()
    const user = {
      ...usr,
      password: 'flco7G90cy#BK8HpAJQ5t5JHLWu9q&8JCe',
    }

    const { statusCode, body, type } = await supertest(app)
      .post('/user/signIn')
      .send(user)

    expect(statusCode).toBe(200)
    expect(type).toBe('application/json')

    const secretKey = process.env.TEST_JWT_SECRET
    const verifiedToken = jwt.verify(body.token, secretKey)

    expect(verifiedToken).toBeTruthy()
  })

  it('should successfully sign up a user with valid credentials', async () => {
    const usr = randomUser()
    const newUser = {
      ...usr,
      email: 'example2@gmail.com',
    }

    const { statusCode, body, type } = await supertest(app)
      .post('/user/signUp')
      .send(newUser)

    expect(statusCode).toBe(200)
    expect(type).toBe('application/json')

    const secretKey = process.env.TEST_JWT_SECRET
    const verifiedToken = jwt.verify(body.token, secretKey)

    expect(verifiedToken).toBeTruthy()
  })
})
