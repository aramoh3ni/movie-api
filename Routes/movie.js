const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");

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
router.post("/", auth, setMovie);
router.put("/:id", auth, updateMovie);
router.delete("/:id", auth, deleteMovie);

module.exports = router;
