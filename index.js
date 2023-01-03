require("dotenv/config");

const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

const mongoose = require("mongoose").set("strictQuery", false);
const { error } = require("./middleware");
const express = require("express");
const app = express();
require("./startup/routes")(app);

// handle UncaughtException.
process.on("uncaughtException", (exceptions) => {
  console.log(exceptions.message)
})

// hadnel Unhandled Promise Reject
process.on("unhandledRejection", (ex) => {
  throw ex;
});



// ENV VARIABLES
const ENV = process.env.STATUS;
const PORT = process.env.PORT || 3000;
const DB_URL = process.env.HOST + process.env.MONGO_DB_NAME;

// DATABASE SETUP
mongoose
  .connect(DB_URL)
  .then(() => console.log(`Connected to Database`))
  .catch((err) => console.log("Database connection Error", err.message));

// Error Handler
app.use(error);

app.listen(PORT, (err) => {
  if (err) console.log(`Connection: ${err}`);
  else console.log(`Server is listening on PORT ${PORT} 🚀`);
});
