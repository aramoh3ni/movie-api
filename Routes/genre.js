const express = require("express");
const router = express.Router();

const { auth, isAdmin, tryc } = require("../middleware");


// CONTROLLERS
const {
  getGenre,
  getGenreById,
  setGenre,
  deleteGenre,
  updateGenre,
} = require("../controllers/genre.controller");

// ROUTES
router.get("/", auth, tryc(getGenre));
router.get("/:id", auth, tryc(getGenreById));
router.post("/", auth, isAdmin, tryc(setGenre));
router.put("/:id", auth, isAdmin, tryc(updateGenre));
router.delete("/:id", auth, isAdmin, tryc(deleteGenre));

module.exports = router;
