require("dotenv").config();
// const debug = require('debug')('app:startup');
const mongoose = require("mongoose").set("strictQuery", false);
const morgan = require("morgan");
// const logger = require("./middleware/logger");
const express = require("express");
const app = express();

// ENV VARIABLES
const ENV = process.env.NODE_ENV;
const PORT = process.env.PORT || 3000;
const DBURL = process.env.DB_URL


// ROUTES
const movies = require("./routes/movie");
const genres = require("./routes/genre");
const books = require("./routes/books");
const home = require("./routes/main");


//MIDDLEWARE
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(express.static("public"));
// app.use(logger);

// SETUP ENV
if (ENV === "development") {
  app.use(morgan("common"));
  // debug("Morgan enabled...");
}

// DATABASE SETUP
mongoose
  .connect("mongodb://127.0.0.1:27017/dailymovies")
  .then(() => console.log(`Connected to Database`))
  .catch((err) => console.log("Database connection Error", err.message));

// ENDPOINTS
app.use("/api/movies", movies);
app.use("/api/books", books);
app.use("/api/genres", genres);
app.use("/", home);

app.listen(PORT, (err) => {
  if (err) console.log(`Connection: ${err}`);
  else console.log(`Server Listening on PORT ${PORT} 🚀`);
});
