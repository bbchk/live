import supertest from "supertest";
import app from "@src/app.js";

import { setupDB, teardownDB } from "#src/__tests__/in_memory_db/db_utils.js";
import { adminToken } from "#src/__tests__/utils/admin_token.js";

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

  it.skip("should successfully get product by its id from database", async () => {
    const { statusCode, body, type } = await supertest(app).get("/products/");

    expect(statusCode).toBe(200);
    expect(type).toBe("application/json");
    expect(body.length).toBeGreaterThan(0);
    expect(body).toBeInstanceOf(Array);
  });
});
