const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");

// CONTROLLERS
const {
  getGenre,
  getGenreById,
  setGenre,
  deleteGenre,
  updateGenre,
} = require("../controllers/genre.controller");

// ROUTES
router.get("/", auth, getGenre);
router.get("/:id", auth, getGenreById);
router.post("/", auth, setGenre);
router.put("/:id", auth, updateGenre);
router.delete("/:id", auth, deleteGenre);

module.exports = router;
