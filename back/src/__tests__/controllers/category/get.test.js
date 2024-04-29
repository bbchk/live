import supertest from "supertest";
import app from "@src/app.js";

import * as inMemoryDB from "#src/__tests__/in_memory_db/db_utils.js";

beforeAll(async () => {
  await inMemoryDB.connect();
  await inMemoryDB.clearDatabase();
  await inMemoryDB.populateWithTestData();
});

afterAll(async () => await inMemoryDB.disconnect());

describe("GET /categories", () => {
  it("should get all the categories", async () => {
    const { statusCode, body, type } = await supertest(app).get("/categories");

    expect(statusCode).toBe(200);
    expect(type).toBe("application/json");
    expect(body.length).toBeGreaterThan(0);
    expect(body).toBeInstanceOf(Array);
  });

  it("should get category with path specified in params", async () => {
    const categoryPath = "dlya-kotiv--posud";
    const { statusCode, body, type } = await supertest(app).get(
      `/categories/${categoryPath}`
    );

    const expectedCategory = {
      _id: "65ad3ec1864774208de09914",
      name: "Посуд",
      order: 10,
      path: "Для Котів,Посуд",
      imagePath:
        "https://storage.googleapis.com/live_world/categories/dlya-kotiv---posud.jpg",
      __v: 0,
      filters: ["Бренд", "Колір", "Матеріал", "Країна-виробник товару"],
    };

    expect(body).toEqual(expectedCategory);

    expect(statusCode).toBe(200);
    expect(type).toBe("application/json");
  });

  it("should get subcategories of category with specified path in params", async () => {
    const categoryPath = "dlya-kotiv";
    const { statusCode, body, type } = await supertest(app).get(
      `/categories/subcategories/${categoryPath}`
    );

    expect(statusCode).toBe(200);
    expect(type).toBe("application/json");
    expect(body.length).toBeGreaterThan(0);
    expect(body).toBeInstanceOf(Array);
  });
});
