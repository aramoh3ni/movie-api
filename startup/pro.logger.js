const winston = require("winston");
const { format } = require("winston");
require("winston-mongodb");

const myFormat = format.printf(({ level, message, timestamp }) => {
  return `[${level}] : ${timestamp} : ${message}`;
});

const options = {
  file: {
    level: "info",
    filename: "./logs/logErrors.log",
    handleExceptions: true,
    json: true,
    maxsize: 5242880, // 5MB
    maxFiles: 5,
  },
  console: {
    level: "info",
    handleExceptions: true,
    json: false,
  },
};

module.exports = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.json(),
    winston.format.timestamp(),
    myFormat
  ),
  transports: [
    new winston.transports.MongoDB({
      db: process.env.HOST + process.env.DB_LOG_NAME,
    }),
    new winston.transports.File(options.file),
    new winston.transports.Console(options.console),
  ],
  exitOnError: true,
  silent: false,
});
