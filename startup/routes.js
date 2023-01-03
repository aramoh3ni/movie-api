const express = require("express");
const auth = require("../routes/auth");
const users = require("../routes/users");
const movies = require("../routes/movie");
const genres = require("../routes/genre");
const customers = require("../routes/customer");
const books = require("../routes/books");
const rentals = require("../routes/rental");
const home = require("../routes/main");

module.exports = function (app) {
  app.use(express.json());
  app.use("/api/auth", auth);
  app.use("/api/users", users);
  app.use("/api/movies", movies);
  app.use("/api/books", books);
  app.use("/api/genres", genres);
  app.use("/api/customers", customers);
  app.use("/api/rentals", rentals);
  app.use("/", home);
};
