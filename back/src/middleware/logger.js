import dotenv from "dotenv";
dotenv.config();

import winston from "winston";
const { transports } = winston;

import expressWinston from "express-winston";
import MongoDB from "winston-mongodb";
import mongoose from "mongoose";

// printf((info) => `[${info.timestamp}] ${info.level}: ${info.message}`)

// const db = mongoose.connection.useDb("test");
// const options = {
//   useUnifiedTopology: true, // MongoDB connection options
//   collection: "logs.errors", // Set collection name for storing logs
//   capped: false, // Set to true if using a capped collection
//   expireAfterSeconds: 2592000, // TTL (time-to-live) in seconds for log documents
//   leaveConnectionOpen: false, // Close the MongoDB connection after logging
//   storeHost: false, // Disable storing hostname in log documents
//   metaKey: "additionalInfo", // Specify a key to store additional metadata
// };

export const infoLogger = expressWinston.logger({
  transports: [
    new transports.Console(),
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
  ],
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

export const errorLogger = expressWinston.errorLogger({
  transports: [new winston.transports.Console()],
  format: winston.format.combine(
    winston.format.errors({ stack: true }),
    winston.format.json(),
    winston.format.printf(
      (info) => `[${info.timestamp}] ${info.level}: ${info.message}`
    )
  ),
});
