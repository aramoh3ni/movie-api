const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");

// CONTROLLERS
const {
  getUsers,
  getUserById,
  setUser,
  delettUser,
  updattUser,
} = require("../controllers/user.controller");

// ROUTES
router.get("/", auth, getUsers);
router.get("/:id", auth, getUserById);
router.post("/", setUser);
router.put("/:id", auth, updattUser);
router.delete("/:id", auth, delettUser);

module.exports = router;
