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
  getMe,
  updateMe,
  getUsers,
  getUserById,
  setUser,
  validateMe,
} = require("../controllers/user.controller");

// VALIDATOR
const { validateUser } = require("../models/users.model");

// ROUTES
router.get("/me", auth, validateObjectId, tryc(getMe));
router.put(
  "/me",
  auth,
  validateObjectId,
  validateBody(validateMe),
  tryc(updateMe)
);
router.get("/", auth, isAdmin, tryc(getUsers));
router.get("/:id", auth, isAdmin, validateObjectId, tryc(getUserById));
router.post("/", validateBody(validateUser), tryc(setUser));

module.exports = router;
