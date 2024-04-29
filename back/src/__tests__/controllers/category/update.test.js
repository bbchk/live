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

describe("PATCH /categories", () => {
  it("should update category", async () => {
    const cat = {
      __v: 0,
      _id: "65ad3ec1864774208de09924",
      name: "Іграшки",
      order: 3,
      path: "Для Птахів,Іграшки",
      imagePath:
        "https://storage.googleapis.com/live_world/categories/dlya_ptakhіv---іgrashki.jpg",
      filters: ["Бренд", "Тип", "Сезон", "Розмір тварини", "Колір"],
    };
    cat.order = 1;

    const { statusCode, body, type } = await supertest(app)
      .patch(`/categories/${cat._id}`)
      .set("Authorization", `Bearer ${adminToken}`)
      .send(cat);

    expect(statusCode).toBe(200);
    expect(type).toBe("application/json");
    expect(body).toEqual(cat);
  });
});
