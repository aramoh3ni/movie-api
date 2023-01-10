const express = require("express");
const app = express();

const { server_msgs } = require("./constants/message");

// ENVIRNMENT VARIABLES SETUP
require("dotenv/config");
const NODE_ENV = process.env.NODE_ENV;
const URL = process.env.URL || "http://localhost";
const PORT = process.env.PORT || 3000;

// STRATUP
let logger = require("./startup/dev.logger");
if (NODE_ENV === "production") {
  logger = require("./startup/pro.logger");
}

require("./startup/cors")(app);
require("./startup/routes")(app);
require("./startup/db")(NODE_ENV);
require("./startup/validation")();

const server = app.listen(PORT, (err) => {
  if (err) return winston.error("Connection Faild");
  logger.info(server_msgs.listening(PORT, URL));
  logger.info(server_msgs.mode(NODE_ENV));
});

module.exports = server;
