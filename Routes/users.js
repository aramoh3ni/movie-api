const express = require("express");
const router = express.Router();

const { auth, isAdmin, tryc, validateObjectId } = require("../middleware");

// CONTROLLERS
const {
  getMe,
  updateMe,
  getUsers,
  getUserById,
  setUser,
} = require("../controllers/user.controller");

// ROUTES
router.get("/me", auth, validateObjectId, tryc(getMe));
router.put("/me", auth, validateObjectId, tryc(updateMe));
router.get("/", auth, isAdmin, tryc(getUsers));
router.get("/:id", auth, isAdmin, validateObjectId, tryc(getUserById));
router.post("/", tryc(setUser));

module.exports = router;
