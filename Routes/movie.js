const express = require("express");
const router = express.Router();

// CONTROLLERS
const {
  getMovies,
  getMovieById,
  setMovie,
  updateMovie,
  deleteMovie,
} = require("../controllers/movie.contoller");

router.get("/", getMovies);
router.get("/:id", getMovieById);
router.post("/", setMovie);
router.put("/:id", updateMovie);
router.delete("/:id", deleteMovie);

module.exports = router;
