const router = require("express").Router();

// CONTROLLERS
const {
  getRentals,
  getRentalById,
  setRental,
} = require("../controllers/rental.controller");

router.get("/", getRentals);
router.get("/:id", getRentalById);
router.post("/", setRental);

module.exports = router;
