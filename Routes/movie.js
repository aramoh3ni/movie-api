const express = require("express");
const router = express.Router();

const {
  auth,
  isAdmin,
  tryc,
  validateObjectId,
  validateBody,
} = require("../middleware");

// CONTROLLERS
const {
  getMovies,
  getMovieById,
  setMovie,
  updateMovie,
  deleteMovie,
} = require("../controllers/movie.contoller");

// VALIDATOR
const { validateMovie } = require("../models/movie.model");

router.get("/", tryc(getMovies));
router.get("/:id", validateObjectId, tryc(getMovieById));
router.post("/", auth, isAdmin, validateBody(validateMovie), tryc(setMovie));
router.put(
  "/:id",
  auth,
  isAdmin,
  validateObjectId,
  validateBody(validateMovie),
  tryc(updateMovie)
);
router.delete("/:id", auth, isAdmin, validateObjectId, tryc(deleteMovie));

module.exports = router;
