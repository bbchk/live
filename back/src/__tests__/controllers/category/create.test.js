import dotenv from "dotenv";
dotenv.config();

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

describe("POST /categories", () => {
  it("should create new category", async () => {
    const testCategory = {
      name: "TODO",
      order: 1,
      path: "TODO",
      imagePath:
        "https://storage.googleapis.com/live_world/categories/todo.jpg",
      filters: [],
    };

    const { statusCode, body, type } = await supertest(app)
      .post("/categories")
      .set("Authorization", `Bearer ${adminToken}`)
      .send(testCategory);

    expect(statusCode).toBe(200);
    expect(type).toBe("application/json");
  });
});
