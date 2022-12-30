const express = require("express");
const router = express.Router();

const { auth, isAdmin } = require("../middleware");

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
router.post("/", auth, isAdmin, setMovie);
router.put("/:id", auth, isAdmin, updateMovie);
router.delete("/:id", auth, isAdmin, deleteMovie);

module.exports = router;
