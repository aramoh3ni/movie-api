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
  updateMe,
  deleteMe,
} = require("../controllers/user.controller");

// ROUTES
router.get("/me", auth, getMe);
router.put("/me", auth, updateMe);
router.delete("/me", auth, deleteMe);
router.get("/", auth, isAdmin, getUsers);
router.get("/:id", auth, isAdmin, getUserById);
router.post("/", setUser);

module.exports = router;
