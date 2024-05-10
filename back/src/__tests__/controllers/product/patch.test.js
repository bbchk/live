import supertest from 'supertest';
import app from '@src/app.js';

import { setupDB, teardownDB } from '#src/__tests__/in_memory_db/db_utils.js';
import { adminToken } from '#src/__tests__/utils/admin_token.js';
import { randomProduct } from '#src/__tests__/utils/data_generator.js';

beforeAll(async function () {
  await setupDB();
});
afterAll(async function () {
  await teardownDB();
});

describe('PATCH /products', () => {
  it('should successfully update random product from db', async () => {
    const pd = randomProduct();
    pd.price = pd.price + 1;

    const { statusCode, body, type } = await supertest(app)
      .patch(`/products/${pd._id}`)
      .set('Authorization', `Bearer ${adminToken}`)
      .send(pd);

    expect(statusCode).toBe(200);
    expect(type).toBe('application/json');

    expect(body).toHaveProperty('name');
    expect(body).toHaveProperty('category');
    expect(body).toHaveProperty('price');
    expect(body).toHaveProperty('description');
    expect(body).toHaveProperty('characteristics');
    expect(body).toHaveProperty('images');
    expect(body).toHaveProperty('left');
  });
});
