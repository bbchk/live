import supertest from "supertest";
import app from "@src/app.js";

import { setupDB, teardownDB } from "#src/__tests__/in_memory_db/db_utils.js";
import { adminToken } from "#src/__tests__/utils/admin_token.js";
import { randomProduct } from "#src/__tests__/utils/data_generator.js";
import Product from "#src/models/category.model.js";

beforeAll(async function () {
  await setupDB();
});
afterAll(async function () {
  await teardownDB();
});

describe("GET /products", () => {
  it("should successfully get all the products from database", async () => {
    const { statusCode, body, type } = await supertest(app).get("/products");

    await new Promise((resolve) => setTimeout(resolve, 2000));

    expect(statusCode).toBe(200);
    expect(type).toBe("application/json");

    expect(body.length).toBeGreaterThan(0);
    expect(body).toBeInstanceOf(Array);
  });

  it("should successfully get product by its id from database", async () => {
    const pd = randomProduct();

    const { statusCode, body, type } = await supertest(app).get(
      `/products/product/${pd._id}`
    );

    expect(statusCode).toBe(200);
    expect(type).toBe("application/json");

    expect(body._id).toEqual(pd._id);
    expect(body.path).toEqual(pd.path);
  });

  it("should successfully get products by passed ids array from database", async () => {
    const randProducts = [];
    for (let i = 0; i < 5; i++) {
      randProducts.push(randomProduct());
    }

    const { statusCode, body, type } = await supertest(app).get(
      `/products/by-ids?ids=${randProducts.map((p) => p._id).join(",")}`
    );

    expect(statusCode).toBe(200);
    expect(type).toBe("application/json");
    expect(body.length).toBeGreaterThan(0);
    expect(body).toBeInstanceOf(Array);
  });
});
