const router = require("express").Router();

const { auth, isAdmin, tryc, validateObjectId } = require("../middleware");

// CONTROLLERS
const {
  getCutomers,
  getCutomerById,
  setCustomer,
  updateCustomer,
  deleteCustomer,
} = require("../controllers/customer.controller");

router.get("/", auth, tryc(getCutomers));
router.get("/:id", validateObjectId, auth, tryc(getCutomerById));
router.post("/", auth, isAdmin, tryc(setCustomer));
router.put("/:id", validateObjectId, auth, isAdmin, tryc(updateCustomer));
router.delete("/:id", validateObjectId, auth, isAdmin, tryc(deleteCustomer));

module.exports = router;
