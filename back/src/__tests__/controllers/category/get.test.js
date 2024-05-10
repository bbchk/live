import supertest from 'supertest';
import app from '@src/app.js';

import { setupDB, teardownDB } from '#src/__tests__/in_memory_db/db_utils.js';
import { adminToken } from '#src/__tests__/utils/admin_token.js';
import { randomCategory } from '#src/__tests__/utils/data_generator.js';
import { transliterate } from '@bbuukk/slugtrans/transliterate';
import { slugify } from '@bbuukk/slugtrans/slugify';

beforeAll(async function () {
  await setupDB();
});
afterAll(async function () {
  await teardownDB();
});

describe('GET /categories', () => {
  it('should get all the categories', async () => {
    const { statusCode, body, type } = await supertest(app).get('/categories');

    expect(statusCode).toBe(200);
    expect(type).toBe('application/json');
    expect(body.length).toBeGreaterThan(0);
    expect(body).toBeInstanceOf(Array);
  });

  it('should successfully get category with path specified in params', async () => {
    const randCat = randomCategory();

    const { statusCode, body, type } = await supertest(app).get(
      `/categories/category/by-path/${slugify(transliterate(randCat.path))}`,
    );

    expect(statusCode).toBe(200);
    expect(type).toBe('application/json');
    expect(body).toEqual(randCat);
  });

  it('should get subcategories of category with specified path in params', async () => {
    const categoryPath = 'dlya-kotiv';
    const { statusCode, body, type } = await supertest(app).get(
      `/categories/subcategories/by-parent-category-path/${categoryPath}`,
    );

    expect(statusCode).toBe(200);
    expect(type).toBe('application/json');
    expect(body.length).toBeGreaterThan(0);
    expect(body).toBeInstanceOf(Array);
  });
});
