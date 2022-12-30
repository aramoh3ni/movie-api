const express = require("express");
const router = express.Router();

// CONTROLLERS
const {
  getUsers,
  getUserById,
  setUser,
  delettUser,
  updattUser,
} = require("../controllers/user.controller");

// ROUTES
router.get("/", getUsers);
router.get("/:id", getUserById);
router.post("/", setUser);
router.put("/:id", updattUser);
router.delete("/:id", delettUser);

module.exports = router;
