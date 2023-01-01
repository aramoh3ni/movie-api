const express = require("express");
const router = express.Router();

const { auth, isAdmin, tryc, validateObjectId } = require("../middleware");


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
router.get("/:id", auth, validateObjectId, tryc(getGenreById));
router.post("/", auth, isAdmin, tryc(setGenre));
router.put("/:id", auth, isAdmin, validateObjectId, tryc(updateGenre));
router.delete("/:id", auth, isAdmin, validateObjectId, tryc(deleteGenre));

module.exports = router;
