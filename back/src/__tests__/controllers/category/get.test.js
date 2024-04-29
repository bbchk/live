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

  it.skip("should get subcategories of category with specified path in params", async () => {
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

// export const getDirectSubcategoriesByPath = asyncErrorHandler(
//   async (req, res, next) => {
//     const { path: slugPath } = req.params;

//     const parentCategory = await categoryService.getCategoryBySlugPath(
//       slugPath
//     );

//     if (!parentCategory)
//       return next(new _Error(`Category with path ${slugPath} not found.`, 404));

//     const ONE_LEVEL_NESTED_DEEP = 1;
//     const categories = await categoryService.getSubcategories(
//       parentCategory,
//       ONE_LEVEL_NESTED_DEEP
//     );
//     res.status(200).json(categories);
//   }
// );
