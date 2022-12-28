// const debug = require('debug')('app:startup');
const mongoose = require("mongoose").set("strictQuery", false);
const morgan = require("morgan");
// const logger = require("./middleware/logger");
const express = require("express");
const app = express();

// ROUTES
const movies = require("./routes/movie");
const genres = require("./routes/genre");
const customers = require('./routes/customer');
const books = require("./routes/books");
const home = require("./routes/main");

//MIDDLEWARE
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(express.static("public"));  // configuring static files.
// app.use(logger);

// ENV VARIABLES
require("dotenv").config();
const ENV = process.env.STATUS;
const PORT = process.env.PORT || 3000;
const DB_URL = process.env.HOST + process.env.DB

// SETUP ENV
if (ENV === "development") {
  app.use(morgan("common"));
  // debug("Morgan enabled...");
}

// DATABASE SETUP
mongoose
  .connect(DB_URL)
  .then(() => console.log(`Connected to Database`))
  .catch((err) => console.log("Database connection Error", err.message));

// ENDPOINTS
app.use("/api/movies", movies);
app.use("/api/books", books);
app.use("/api/genres", genres);
app.use('/api/customers', customers)
app.use("/", home);

app.listen(PORT, (err) => {
  if (err) console.log(`Connection: ${err}`);
  else console.log(`Server is listening on PORT ${PORT} 🚀`);
});
