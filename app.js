// const log = require('./logger');

// console.log(logger);
// it log the exports => {log: [Function: log], endPoint: "http://myloggger.io/log"}

// console.log(logger.log("Alireza"))

// console.log(log("ALireza"));

const path = require("path");
const pathObj = path.parse(__dirname);

console.log(pathObj);