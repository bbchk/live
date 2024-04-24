import dotenv from "dotenv";
dotenv.config();

// import MongoDB from "winston-mongodb";
// import mongoose from "mongoose";

import winston from "winston";
const { transports } = winston;
import MongoDB from "winston-mongodb";

const mainLoggerTransports = [
  new transports.MongoDB({
    level: "warn",
    db: process.env.MONGO_URI,
    collection: "logs.warnings",
    options: { useUnifiedTopology: true },
  }),
  new transports.MongoDB({
    level: "error",
    db: process.env.MONGO_URI,
    collection: "logs.errors",
    options: { useUnifiedTopology: true },
  }),
];

if (process.env.NODE_ENV !== "production") {
  mainLoggerTransports.push(new transports.Console());
}

winston.loggers.add("mainLogger", {
  transports: mainLoggerTransports,
  format: winston.format.combine(
    winston.format.json(),
    winston.format.prettyPrint(),
    winston.format.timestamp({
      format: "YYYY-MM-DD hh:mm:ss.SSS A",
    }),
    winston.format.metadata(),
    winston.format.align()
  ),
  meta: true,
  expressFormat: true,
  statusLevels: true,
});

export const mainLogger = winston.loggers.get("mainLogger");
