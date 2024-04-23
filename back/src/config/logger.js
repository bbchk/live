// import dotenv from "dotenv";
// dotenv.config();
// import express from "express";
// import { transports, format } from "winston";
// const {
//   combine,
//   timestamp,
//   printf,
//   colorize,
//   align,
//   json,
//   prettyPrint,
//   simple,
//   metadata,
// } = format;
// import expressWinston from "express-winston";
// import MongoDB from "winston-mongodb";

// export const logger = expressWinston.logger({
//   transports: [
//     new transports.Console(),
//     new transports.MongoDB({
//       level: "warn",
//       db: process.env.MONGO_URI,
//       collection: "logs.warnings",
//       options: { useUnifiedTopology: true },
//     }),
//     new transports.MongoDB({
//       level: "error",
//       db: process.env.MONGO_URI,
//       collection: "logs.errors",
//       options: { useUnifiedTopology: true },
//     }),
//   ],
//   format: combine(
//     colorize({ all: true }),
//     json(),
//     prettyPrint(),
//     simple(),
//     timestamp({
//       format: "YYYY-MM-DD hh:mm:ss.SSS A",
//     }),
//     metadata(),
//     align(),
//     printf((info) => `[${info.timestamp}] ${info.level}: ${info.message}`)
//   ),

//   meta: true,
//   msg: "HTTP {{req.method}} {{req.url}}",
//   expressFormat: true,
//   colorize: false,
// });

// export const errorLoggger = expressWinston.errorLogger({
//   transports: [
//     new transports.File({
//       filename: "logsInternalErrors.log",
//     }),
//   ],
//   format: format.combine(format.json(), format.timestamp()),
// });
