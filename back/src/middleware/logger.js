import dotenv from 'dotenv'
dotenv.config()

import winston from 'winston'
import expressWinston from 'express-winston'
const { transports } = winston

//eslint-disable-next-line no-unused-vars
import MongoDB from 'winston-mongodb'
// import mongoose from "mongoose";

import { mainLogger as ml } from '#src/utils/loggers.js'

expressWinston.requestWhitelist.push('body')

export const infoLogger = expressWinston.logger({
  winstonInstance: ml,
  expressFormat: true,
  statusLevels: true,
})

const errorLoggerTransports = [new transports.Console()]

if (process.env.NODE_ENV !== 'production') {
  errorLoggerTransports.push(new transports.File({ filename: 'errors.log' }))
}

export const errorLogger = expressWinston.errorLogger({
  transports: errorLoggerTransports,
  format: winston.format.combine(
    winston.format.json(),
    winston.format.errors({ stack: true }),
    winston.format.timestamp(),
    winston.format.prettyPrint(),
    winston.format.printf(
      (info) => `[${info.timestamp}] ${info.level}: ${info.meta.message}`,
    ),
  ),
  expressFormat: true,
  statusLevels: true,
})
