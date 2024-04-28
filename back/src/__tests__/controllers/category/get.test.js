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
    expect(body).toBeInstanceOf(Array);
  });

  it("should get category with path specified in params", async () => {
    const categoryPath = "dlya-kotiv--posud";
    const { statusCode, body, type } = await supertest(app).get(
      `/categories/${categoryPath}`
    );

    expect(statusCode).toBe(200);
    expect(type).toBe("application/json");
  });
});

// const categoryExample = {
//   _id: "65ad3ec1864774208de09924",
//   name: "Іграшки",
//   order: 3,
//   path: "Для Птахів,Іграшки",
//   imagePath:
//     "https://storage.googleapis.com/live_world/categories/dlya_ptakhіv---іgrashki.jpg",
//   __v: 0,
//   "filters ": [
//     "Бренд",
//     "Матеріал",
//     "Тип",
//     "Країна-виробник товару",
//     "Новий - б/в",
//   ],
// };

// expect(body).toMatchObject({});
