const express = require("express");
const router = express.Router();

// const { auth, isAdmin } = require("../middleware");

const auth = require("../middleware/auth");
const isAdmin = require("../middleware/admin")

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
router.post("/", auth, isAdmin, setGenre);
router.put("/:id", auth, isAdmin, updateGenre);
router.delete("/:id", auth, isAdmin, deleteGenre);

module.exports = router;
