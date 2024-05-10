import dotenv from 'dotenv';
dotenv.config();

import winston from 'winston';
const { transports } = winston;
import MongoDB from 'winston-mongodb';

const THIRTY_DAYS = 2592000;
const MAX_DOCS_NUMBER = 1000;
const COLLECTION_SIZE_BYTES = 1000;

const optionsDB = {
  options: {
    useUnifiedTopology: true, // Use the new topology engine
    useNewUrlParser: true, // Use the new connection string parser
  },
  db: process.env.MONGODB_URI,
  collection: 'logs.errors', // Set collection name for storing logs
  capped: true, //Collection has a fixed size and acts like a circular buffer
  cappedSize: COLLECTION_SIZE_BYTES,
  cappedMax: MAX_DOCS_NUMBER,
  storeHost: false, // Disable storing hostname in log documents
  leaveConnectionOpen: false,
  expireAfterSeconds: THIRTY_DAYS, // TTL (time-to-live) in seconds for documents
};

const mainLoggerTransports = [];

if (process.env.NODE_ENV === 'production') {
  mainLoggerTransports.push(
    new transports.MongoDB({
      level: 'warn',
      collection: 'logs.warnings',
      ...optionsDB,
    }),
    new transports.MongoDB({
      level: 'error',
      collection: 'logs.errors',
      ...optionsDB,
    }),
  );
}

if (process.env.NODE_ENV !== 'production') {
  mainLoggerTransports.push(
    new transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.printf((info) => {
          return `${info.level}:${info.message}`;
        }),
      ),
    }),
  );
}

winston.loggers.add('mainLogger', {
  transports: mainLoggerTransports,
  format: winston.format.combine(
    winston.format.json(),
    winston.format.prettyPrint(),
    winston.format.timestamp({
      format: 'YYYY-MM-DD hh:mm:ss.SSS A',
    }),
    winston.format.metadata(),
    winston.format.align(),
  ),
  meta: true,
  expressFormat: true,
  statusLevels: true,
});

export const mainLogger = winston.loggers.get('mainLogger');
