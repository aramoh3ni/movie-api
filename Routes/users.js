const express = require("express");
const router = express.Router();

const { auth, isAdmin } = require("../middleware");

// CONTROLLERS
const {
  getMe,
  getUsers,
  getUserById,
  setUser,
  delettUser,
  updattUser,
} = require("../controllers/user.controller");

// ROUTES
router.get("/me", auth, getMe);
router.get("/", auth, isAdmin, getUsers);
router.get("/:id", auth, isAdmin, getUserById);
router.post("/", auth, isAdmin, setUser);
router.put("/:id", auth, isAdmin, updattUser);
router.delete("/:id", auth, isAdmin, delettUser);

module.exports = router;
