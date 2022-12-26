// const debug = require('debug')('app:startup');
const mongoose = require("mongoose").set("strictQuery", false);
const morgan = require("morgan");
// const logger = require("./middleware/logger");
const express = require("express");
const app = express();

// ENV VARIABLES
require("dotenv").config();
const envirnment = process.env.NODE_ENV;
const PORT = process.env.PORT || 3000;

//MIDDLEWARE
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(express.static("public"));
// app.use(logger);

// SETUP ENVIRNMENT
if (envirnment === "development") {
  app.use(morgan("common"));
  // debug("Morgan enabled...");
}

// DATABASE SETUP
mongoose
  .connect(process.env.DB_URL + process.env.DB_NAME)
  .then(() => console.log(`Connected to ${process.env.DB_NAME}`))
  .catch((err) => console.log("Database connection Error", err.message));

// ROUTES
const movies = require("./routes/movie");
const genres = require("./routes/genre");
const books = require("./routes/books");
const home = require("./routes/main");

app.use("/api/movies", movies);
app.use("/api/books", books);
app.use("/api/genres", genres);
app.use("/", home);

app.listen(PORT, (err) => {
  if (err) console.log(`Connection: ${err}`);
  else console.log(`Server Listening on PORT ${PORT} 🚀`);
});
