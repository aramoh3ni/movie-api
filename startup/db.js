const mongoose = require("mongoose").set("strictQuery", false);
const { database_msgs } = require("../constants/message");

const logger = require("./dev.logger");

let DB_URL = process.env.HOST + process.env.MONGO_DB_NAME;
let DB_NAME = process.env.MONGO_DB_NAME


module.exports = (NODE_ENV) => {
  if (NODE_ENV === "test") {
    DB_URL = process.env.HOST + process.env.MONGO_DB_NAME_TEST
    DB_NAME = process.env.MONGO_DB_NAME_TEST
  }
  mongoose
    .connect(DB_URL, { useUnifiedTopology: true })
    .then(() => logger.info(database_msgs.success(DB_NAME)));
};
