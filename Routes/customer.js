const router = require("express").Router();

const { auth, isAdmin } = require("../middleware");

// CONTROLLERS
const {
  getCutomers,
  getCutomerById,
  setCustomer,
  updateCustomer,
  deleteCustomer,
} = require("../controllers/customer.controller");

router.get("/", auth, getCutomers);
router.get("/:id", auth, getCutomerById);
router.post("/", auth, isAdmin, setCustomer);
router.put("/:id", auth, isAdmin, updateCustomer);
router.delete("/:id", auth, isAdmin, deleteCustomer);

module.exports = router;
