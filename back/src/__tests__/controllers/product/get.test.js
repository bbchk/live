import supertest from 'supertest'
import app from '@src/app.js'

import { setupDB, teardownDB } from '#src/__tests__/in_memory_db/db_utils.js'

import {
  randomCategory,
  randomProduct,
} from '#src/__tests__/utils/data_generator.js'

import { slugify } from '@bbuukk/slugtrans/slugify'
import { transliterate } from '@bbuukk/slugtrans/transliterate'

beforeAll(async function () {
  await setupDB()
})
afterAll(async function () {
  await teardownDB()
})

describe('GET /products', () => {
  it('should successfully get all the products from database', async () => {
    const { statusCode, body, type } = await supertest(app).get('/products')

    await new Promise((resolve) => setTimeout(resolve, 2000))

    expect(statusCode).toBe(200)
    expect(type).toBe('application/json')

    expect(body.length).toBeGreaterThan(0)
    expect(body).toBeInstanceOf(Array)
  })

  it('should successfully get product by its id from database', async () => {
    const pd = randomProduct()

    const { statusCode, body, type } = await supertest(app).get(
      `/products/product/by-id/${pd._id}`,
    )

    expect(statusCode).toBe(200)
    expect(type).toBe('application/json')

    expect(body._id).toEqual(pd._id)
    expect(body.path).toEqual(pd.path)
  })

  it('should successfully get products by passed ids array from database', async () => {
    const randProducts = []
    for (let i = 0; i < 5; i++) {
      randProducts.push(randomProduct())
    }

    const { statusCode, body, type } = await supertest(app).get(
      `/products/by-ids?ids=${randProducts.map((p) => p._id).join(',')}`,
    )

    expect(statusCode).toBe(200)
    expect(type).toBe('application/json')
    expect(body.length).toBeGreaterThan(0)
    expect(body).toBeInstanceOf(Array)
  })

  it('should successfully get products by slugified category path and filterStr', async () => {
    const randCategory = randomCategory()

    const filtersStr = 'page=1;tsina=1,100'
    const categoryPath = slugify(transliterate(randCategory.path))

    const { statusCode, body, type } = await supertest(app).get(
      `/products/by-category-path/${categoryPath}/filtered-by/${filtersStr}`,
    )

    expect(statusCode).toBe(200)
    expect(type).toBe('application/json')

    const { products, numPages } = body
    expect(numPages).toBeGreaterThan(0)
    expect(products).toBeInstanceOf(Array)
  })

  it.skip('should successfully get products by slugified query and with filterStr', async () => {
    const filtersStr = 'page=1'

    const query = 'для котів'
    const slug = slugify(transliterate(query))

    // dlya-kotiv
    const { statusCode, body, type } = await supertest(app).get(
      `/products/by-query/${slug}/filtered-by/${filtersStr}`,
    )

    expect(statusCode).toBe(200)
    expect(type).toBe('application/json')
    expect(body.products).toBeInstanceOf(Array)
    expect(body.products.length).toBeGreaterThan(0)
  })
})
