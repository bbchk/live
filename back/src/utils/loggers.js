// import dotenv from "dotenv";
// dotenv.config();

// import MongoDB from "winston-mongodb";
// import mongoose from "mongoose";

// loggers.js
import winston from "winston";
const { transports } = winston;

// Configure the mainLogger with transports
winston.loggers.add("mainLogger", {
  transports: [
    new transports.Console({
      format: winston.format.combine(
        winston.format.errors({ stack: true }),
        winston.format.json(),

        winston.format.prettyPrint(),
        winston.format.timestamp({
          format: "YYYY-MM-DD hh:mm:ss.SSS A",
        }),
        winston.format.metadata(),
        winston.format.align()
      ),
    }),
  ],
});

// Export the configured logger
export const mainLogger = winston.loggers.get("mainLogger");
