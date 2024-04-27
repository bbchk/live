import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";

import supertest from "supertest";
import app from "@src/app.js";

// beforeAll(async () => {
//   await mongoose.connect(process.env.MONGO_URI);
// });

// afterAll(async () => {
//   await mongoose.connection.close();
// });

describe("GET /products", () => {
  //   it("should get all the products", async () => {
  //     const response = await supertest(app).get("/products");
  //     expect(response.statusCode).toBe(200);
  //   });
  //   it("should get all the products", async () => {
  //     const response = await supertest(app).get("/products");
  //     expect(response.statusCode).toBe(200);
  //   });
});
