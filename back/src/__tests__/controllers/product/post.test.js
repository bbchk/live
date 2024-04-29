import supertest from "supertest";
import app from "@src/app.js";

import { setupDB, teardownDB } from "#src/__tests__/in_memory_db/db_utils.js";
import { adminToken } from "#src/__tests__/utils/admin_token.js";
import { randomProduct } from "#src/__tests__/utils/data_generator.js";

beforeAll(async function () {
  await setupDB();
});
afterAll(async function () {
  await teardownDB();
});

describe("POST /products", () => {
  it("should successfully create new product", async () => {
    const pd = {
      ...randomProduct(),
      _id: "65ad3ec1884784208de09952",
    };

    const { statusCode, body, type } = await supertest(app)
      .post("/products")
      .set("Authorization", `Bearer ${adminToken}`)
      .send(pd);

    expect(statusCode).toBe(200);
    expect(type).toBe("application/json");

    expect(body).toHaveProperty("name");
    expect(body).toHaveProperty("category");
    expect(body).toHaveProperty("price");
    expect(body).toHaveProperty("description");
    expect(body).toHaveProperty("characteristics");
    expect(body).toHaveProperty("images");
    expect(body).toHaveProperty("left");
  });
});
