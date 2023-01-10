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
  getCutomers,
  getCutomerById,
  setCustomer,
  updateCustomer,
  deleteCustomer,
} = require("../controllers/customer.controller");

// VALIDATOR
const { validateCustomer } = require("../models/customer.model");

router.get("/", auth, tryc(getCutomers));
router.get("/:id", validateObjectId, auth, tryc(getCutomerById));
router.post(
  "/",
  auth,
  isAdmin,
  validateBody(validateCustomer),
  tryc(setCustomer)
);
router.put(
  "/:id",
  validateObjectId,
  auth,
  isAdmin,
  validateBody(validateCustomer),
  tryc(updateCustomer)
);
router.delete("/:id", validateObjectId, auth, isAdmin, tryc(deleteCustomer));

module.exports = router;
