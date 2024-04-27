import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";

import supertest from "supertest";
import app from "@src/app.js";
import { MongoMemoryServer } from "mongodb-memory-server";

beforeAll(async () => {
  const mongoServer = await MongoMemoryServer.create();
  await mongoose.connect(mongoServer.getUri());
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoose.connection.close();
});

describe("GET /products", () => {
  it("should get all the products", async () => {
    const { statusCode } = await supertest(app).get("/products");
    expect(statusCode).toBe(200);
  });

  it("should get all the products", async () => {
    // const response = await supertest(app).get("/products");
    // expect(response.statusCode).toBe(200);
  });
});
