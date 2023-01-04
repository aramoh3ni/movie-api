const winston = require("winston");

// STRATUP
let logger = require("../startup/dev.logger");
if (process.env.NODE_ENV === "production") {
  logger = require("../startup/pro.logger");
}

module.exports = (err, req, res, next) => {
  logger.error(err.message, err);
  res.status(err.status || 500);
  res.send({
    error: { status: err.status || 500, message: err.message, name: err.name },
  });
};
