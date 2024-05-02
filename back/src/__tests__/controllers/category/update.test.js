import supertest from "supertest";
import app from "@src/app.js";

import { setupDB, teardownDB } from "#src/__tests__/in_memory_db/db_utils.js";
import { adminToken } from "#src/__tests__/utils/admin_token.js";
import { randomCategory } from "#src/__tests__/utils/data_generator.js";

beforeAll(async function () {
  await setupDB();
});
afterAll(async function () {
  await teardownDB();
});

describe("PATCH /categories", () => {
  it("should update category", async () => {
    const category = randomCategory();
    category.order = category.order + 1;

    const { statusCode, body, type } = await supertest(app)
      .patch(`/categories/${category._id}`)
      .set("Authorization", `Bearer ${adminToken}`)
      .send(category);

    console.log("🚀 ~ body:", body);
    console.log("🚀 ~ testCategory:", category);

    expect(statusCode).toBe(200);
    expect(type).toBe("application/json");
    expect(body).toEqual(category);
  });
});
