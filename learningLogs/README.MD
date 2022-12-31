// global Objects
// console.log(); 

// setTimeout(); // call function after a delay
// clearTimeout(); // clear function after execute

// setInterval(); 
// clearInterval();

// we can use them using in window object globaly in browser
// but we don't have logic of window object in node then we 
// we can use gloal insted to window.

// we can use windows object using gloabl but
// global.console.log("Hello Wolrd")

// if we create an object we can node use it and it return us undefine.
// var message = "";
// console.log(global.message) // return Undefined
// because it scope inside of this file (app.js) and it is not 
// globaly visitbal outside for all.

// ----------------------------
// Module
// to solve the problem of visibality we must to know the concept of
// Modularity: noted in nodebook.
// to export a module we are using export keyword

// NOTE:: module is not global

// NODE:: In node everyfile are a Module and variables and functions
// defined in that file are scope to that module.

console.log(module);

//-----------------------------------

// Module wrapper 
// Node never execute our code directly, it always wrappeed into
// module of functions.

(function(exports, require, module, __filename, __dirname) {
    console.log(__filename);
    console.log(__dirname);
    var url = 'https://mylogger.js/log';
});

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


const http = require("http");

const server = http.createServer((req, res) => {
  if (req.url === "/") {
    res.write("Hello world Root");
    res.end();
  }

  if (req.url === "/api/books") {
    res.write(
      JSON.stringify([{ id: 1, title: "How to Become Node Developer." }])
    );

    res.end();
  }
});

// server.addListener('connection', (socket) => {
//     console.log("New Connection...");
// })

server.listen(3000);

console.log("Listen on port 3000");
