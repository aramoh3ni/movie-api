const express = require("express");
const { server_msgs } = require("./constants/message");

// ENVIRNMENT VARIABLES SETUP
require("dotenv/config");
const ENV = process.env.STATUS;
const URL = process.env.URL || 'http://localhost';
const PORT = process.env.PORT || 3000;
const DB_URL = process.env.HOST + process.env.MONGO_DB_NAME;

// MIDDLEWARE SETUP
const app = express();
require("./startup/routes")(app);
require("./startup/db")(DB_URL);

// handle UncaughtException.
process.on("uncaughtException", (exceptions) => {
  console.log(exceptions.message);
});

// hadnel Unhandled Promise Reject
process.on("unhandledRejection", (ex) => {
  throw ex;
});

app.listen(PORT, (err) => {
  if (err) console.log(`Connection: ${err}`);
  else console.log(server_msgs.listening(PORT, URL));
});
