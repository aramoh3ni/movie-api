const router = require("express").Router();
const {
  auth,
  isAdmin,
  tryc,
  validateObjectId,
  validateBody,
} = require("../middleware");

// CONTROLLERS
const {
  getRentals,
  getRentalById,
  setRental,
} = require("../controllers/rental.controller");

// VALIDATOR
const { validateRental } = require("../models/rental.model");

router.get("/", auth, isAdmin, tryc(getRentals));
router.get("/:id", auth, isAdmin, validateObjectId, tryc(getRentalById));
router.post("/", auth, isAdmin, validateBody(validateRental), tryc(setRental));

module.exports = router;
