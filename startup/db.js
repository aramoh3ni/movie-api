const mongoose = require("mongoose").set("strictQuery", false);
const { database_msgs } = require("../constants/message");

const logger = require("./dev.logger");

module.exports = (DB_URL) => {
  // DATABASE SETUP
  mongoose
    .connect(DB_URL, { useUnifiedTopology: true })
    .then(() => logger.info(database_msgs.success));
};
