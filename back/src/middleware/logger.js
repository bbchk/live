import dotenv from "dotenv";
dotenv.config();

import winston from "winston";
import expressWinston from "express-winston";
const { transports } = winston;
import MongoDB from "winston-mongodb";
// import mongoose from "mongoose";

import { mainLogger as ml } from "#src/utils/loggers.js";

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

expressWinston.requestWhitelist.push("body");

export const infoLogger = expressWinston.logger({
  winstonInstance: ml,
  expressFormat: true,
  statusLevels: true,
});

const errorLoggerTransports = [];

if (process.env.NODE_ENV !== "production") {
  errorLoggerTransports.push(
    new transports.Console(),
    new transports.File({ filename: "errors.log" })
  );
}

export const errorLogger = expressWinston.errorLogger({
  transports: errorLoggerTransports,
  format: winston.format.combine(
    winston.format.json(),
    winston.format.errors({ stack: true }),
    winston.format.timestamp(),
    winston.format.prettyPrint(),
    winston.format.printf(
      (info) => `[${info.timestamp}] ${info.level}: ${info.meta.message}`
    )
  ),
  expressFormat: true,
  statusLevels: true,
});
