// const log = require('./logger');

// console.log(logger);
// it log the exports => {log: [Function: log], endPoint: "http://myloggger.io/log"}

// console.log(logger.log("Alireza"))

// console.log(log("ALireza"));

// Take information about file path or dir path
// const path = require("path");
// const pathObj = path.parse(__dirname);

// console.log(pathObj);

// Take information about Operating System.
const os = require("os");
const totalMemory = os.totalmem();
const freeMemory = os.freemem();

console.log("Total Memory: ", (totalMemory / 1024) * 100);
console.log("Free Memory: ", freeMemory);