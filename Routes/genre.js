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
  getGenre,
  getGenreById,
  setGenre,
  deleteGenre,
  updateGenre,
} = require("../controllers/genre.controller");

// VALIDATOR
const { validateGenre } = require("../models/genre.model");

// ROUTES
router.get("/", tryc(getGenre));
router.get("/:id", validateObjectId, tryc(getGenreById));
router.post("/", auth, isAdmin, validateBody(validateGenre), tryc(setGenre));
router.put(
  "/:id",
  auth,
  isAdmin,
  validateObjectId,
  validateBody(validateGenre),
  tryc(updateGenre)
);
router.delete("/:id", auth, isAdmin, validateObjectId, tryc(deleteGenre));

module.exports = router;
