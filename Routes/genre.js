const express = require("express");
const router = express.Router();

// CONTROLLERS
const {
  getGenre,
  getGenreById,
  setGenre,
  deleteGenre,
  updateGenre,
} = require("../controllers/genre.controller");

// ROUTES
router.get("/", getGenre);
router.get("/:id", getGenreById);
router.post("/", setGenre);
router.put("/:id", updateGenre);
router.delete("/:id", deleteGenre);

module.exports = router;
