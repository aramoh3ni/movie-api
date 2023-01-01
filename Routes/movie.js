const express = require("express");
const router = express.Router();

const { auth, isAdmin, tryc, validateObjectId } = require("../middleware");

// CONTROLLERS
const {
  getMovies,
  getMovieById,
  setMovie,
  updateMovie,
  deleteMovie,
} = require("../controllers/movie.contoller");

router.get("/", tryc(getMovies));
router.get("/:id", validateObjectId, tryc(getMovieById));
router.post("/", auth, isAdmin, tryc(setMovie));
router.put("/:id", auth, isAdmin, validateObjectId, tryc(updateMovie));
router.delete("/:id", auth, isAdmin, validateObjectId, tryc(deleteMovie));

module.exports = router;
