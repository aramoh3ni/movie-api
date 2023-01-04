const {
  auth,
  users,
  movies,
  genres,
  customers,
  rentals,
  main,
} = require("../routes");
const { error } = require("../middleware");

module.exports = function (app) {
  // Parse to Json
  app.use(require("express").json());

  // Routes
  app.use("/api/auth", auth);
  app.use("/api/users", users);
  app.use("/api/movies", movies);
  app.use("/api/genres", genres);
  app.use("/api/customers", customers);
  app.use("/api/rentals", rentals);
  app.use("/", main);

  // Error Handler
  app.use(error);
};
