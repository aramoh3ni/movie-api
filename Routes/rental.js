const router = require("express").Router();
const { auth, isAdmin, tryc, validateObjectId } = require("../middleware");

// CONTROLLERS
const {
  getRentals,
  getRentalById,
  setRental,
} = require("../controllers/rental.controller");

router.get("/", auth, isAdmin, tryc(getRentals));
router.get("/:id", auth, isAdmin, validateObjectId, tryc(getRentalById));
router.post("/", auth, isAdmin, tryc(setRental));

module.exports = router;
