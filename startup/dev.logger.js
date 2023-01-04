const winston = require("winston");
const { transports, createLogger, format } = require("winston");
require("winston-mongodb");

const myFormat = format.printf(({ level, message, timestamp }) => {
  return `${timestamp} : [${level}] ? ${message}`;
});

const options = {
  file: {
    level: "info",
    filename: "./logs/combined.log",
    handleExceptions: true,
    json: true,
    maxsize: 5242880, // 5MB
    maxFiles: 5,
    colorize: false,
  },
  console: {
    level: "debug",
    handleExceptions: true,
    json: false,
    colorize: true,
  },
};

module.exports = winston.createLogger({
  level: "debug",
  format: winston.format.combine(
    winston.format.json(),
    winston.format.timestamp({ format: "HH:mm:ss" }),
    myFormat
  ),
  transports: [
    new winston.transports.File(options.file),
    new winston.transports.Console(options.console),
  ],
  exceptionHandlers: [
    new transports.File({
      filename: "./logs/uncaughtExceptions.log",
      level: "error",
    }),
  ],
  rejectionHandlers: [
    new transports.File({
      filename: "./logs/uncaughtRejections.log",
      level: "error",
    }),
  ],
  exitOnError: true,
  silent: false,
});

// module.exports = logger;

// const logger = createLogger({
//   levels: winston.config.npm.levels,
//   transports: [
//
//   ],
//   exitOnError: false,
//   exceptionHandlers: [
//     new transports.File({
//       filename: "./logs/uncaughtExceptions.log",
//       level: "error",
//     }),
//   ],
//   rejectionHandlers: [
//     new transports.File({
//       filename: "./logs/uncaughtRejections.log",
//       level: "error",
//     }),
//   ],
// });

// module.exports = logger;

// module.exports = createLogger({
//   level: "info",
//   format: winston.format.json(),
//   transports: [
//     new transports.File({ filename: "combined.log", level: "info" }),
//     new transports.MongoDB({
//       db: "mongodb://127.0.0.1:27017/dailymovies",
//       level: "error",
//     }),
//     new transports.Console({
//       level: "info",
//       format: format.combine(format.colorize(), format.simple()),
//     }),
//   ],
//   exceptionHandlers: [
//     new transports.File({ filename: "uncaughtExceptions.log", level: "error" }),
//   ],
//   rejectionHandlers: [
//     new transports.File({ filename: "uncaughtRejections.log", level: "error" }),
//   ],
//   exitOnError: false,
// });

// handle UncaughtException.
//   process.on("uncaughtException", (exceptions) => {
//     console.log(exceptions.message);
//   });

// hadnel Unhandled Promise Reject
//   process.on("unhandledRejection", (ex) => {
//     throw ex;
//   });
