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
  handleExceptions: true,
  handleRejections: true,
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
      handleExceptions: true
    }),
  ],
  rejectionHandlers: [
    new transports.File({
      filename: "./logs/uncaughtRejections.log",
      level: "error",
      handleRejections: true
    }),
  ],
  exitOnError: true,
});