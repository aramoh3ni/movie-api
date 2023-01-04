const express = require("express");
const app = express();

const { server_msgs } = require("./constants/message");

// ENVIRNMENT VARIABLES SETUP
require("dotenv/config");
const NODE_ENV = process.env.NODE_ENV;
const URL = process.env.URL || "http://localhost";
const PORT = process.env.PORT || 3000;
const DB_URL = process.env.HOST + process.env.MONGO_DB_NAME;

// STRATUP
let logger = require("./startup/dev.logger");
if (NODE_ENV === "production") {
  logger = require("./startup/pro.logger")
}

require("./startup/routes")(app);
require("./startup/db")(DB_URL);
require("./startup/validation")

app.listen(PORT, (err) => {
  if (err) return winston.error("Connection Faild");
  logger.info(server_msgs.listening(PORT, URL));
  logger.info(server_msgs.mode(NODE_ENV));
});
