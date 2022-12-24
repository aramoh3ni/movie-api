// const EventEmitter = require("events");

function log(req, res, next) {
  console.log("Logging...");
  next();
}

module.exports = log;