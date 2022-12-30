const router = require("express").Router();
const auth = require('../middleware/auth');

// CONTROLLERS
const {
  getRentals,
  getRentalById,
  setRental,
} = require("../controllers/rental.controller");

router.get("/", auth, getRentals);
router.get("/:id", auth, getRentalById);
router.post("/", auth, setRental);

module.exports = router;
