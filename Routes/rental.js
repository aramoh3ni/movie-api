const router = require("express").Router();
const { auth, isAdmin } = require("../middleware");

// CONTROLLERS
const {
  getRentals,
  getRentalById,
  setRental,
} = require("../controllers/rental.controller");

router.get("/", auth, isAdmin, getRentals);
router.get("/:id", auth, isAdmin, getRentalById);
router.post("/", auth, isAdmin, setRental);

module.exports = router;
