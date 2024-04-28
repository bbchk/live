import dotenv from "dotenv";
dotenv.config();

import supertest from "supertest";
import app from "@src/app.js";

import * as inMemoryDB from "#src/__tests__/utils/in_memory_db.js";
import genAuthToken from "#src/utils/gen_auth_token.js";

beforeAll(async () => {
  await inMemoryDB.connect();
  await inMemoryDB.clearDatabase();
  await inMemoryDB.populateWithTestData();
});
afterAll(async () => await inMemoryDB.disconnect());

describe("POST /categories", () => {
  const admin = {
    _id: "654e2a8de82e996c3ba8dc51",
    firstName: "first",
    secondName: "second",
    email: "example@gmail.com",
  };

  it("should create new category", async () => {
    const categoryToCreate = {
      name: "TODO",
      order: 1,
      path: "TODO",
      imagePath:
        "https://storage.googleapis.com/live_world/categories/todo.jpg",
      filters: [],
    };

    const token = genAuthToken(admin);

    const { statusCode, body, type } = await supertest(app)
      .post("/categories")
      .set("Authorization", `Bearer ${token}`)
      .send(categoryToCreate);

    expect(statusCode).toBe(200);
    expect(type).toBe("application/json");
  });
});
