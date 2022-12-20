const EventEmitter = require("events");

class Logger extends EventEmitter {
    
    log = (message) => {
    console.log(`Hello, ${message}`);

    this.emit("messageLogged", { id: 1, url: "https://" });
  };
}

// var url = "http://mylogger.io/log";

// function log(message) {
//   // send an HTTP request
//   console.log("Hello, " + message);

//   // Raise an event
//   emitter.emit("messageLogged", { id: 1, url: "https://" });
// }

// module.exports.log = log;
// module.exports.url = url;
// we create and variable of function with and name but exported
// with defirend name
// module.exports.endPont = url;

// to export log as a method
module.exports = Logger;
