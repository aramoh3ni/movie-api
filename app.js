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
// const os = require("os");
// const totalMemory = os.totalmem();
// const freeMemory = os.freemem();

// console.log("Total Memory: ", (totalMemory / 1024) * 100);
// console.log("Free Memory: ", freeMemory);


// const fs = require('fs');

// fs include all sync and async (blocking to non-blocking) methods.
// const files = fs.readdirSync("./")
// console.log(files);

//         promise - call back function 
// fs.readdir('./', (err, files) => {
//     if (err) console.log("error", err)
//     else console.log("Results", files)
// })

// fs.readFile('./README.MD', (err, file) => {
//     console.log(file)
// });

// fs.readFileSync('./README.MD', (err, file) => {
//     if (err) console.log(err)
//     else console.log(file)
// })


// ORDER IS IMPORTANT
// const EventEmitter = require("events");
// const emitter = new EventEmitter();

const Logger = require('./logger');
const logger = new Logger();

// Register a listeer
logger.on('messageLogged', function(args) {
    console.log("Listener Called", args);
});

logger.log("Message");