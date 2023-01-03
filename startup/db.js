const mongoose = require("mongoose").set("strictQuery", false);
const { database_msgs } = require("../constants/message");

module.exports = function (DB_URL) {
  // DATABASE SETUP
  mongoose
    .connect(DB_URL)
    .then(() => console.log(database_msgs.success))
    .catch((err) => console.log(database_msgs.error, err.message));
};
