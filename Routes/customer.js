const router = require("express").Router();

const auth = require("../middleware/auth");

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
router.post("/", auth, setCustomer);
router.put("/:id", auth, updateCustomer);
router.delete("/:id", auth, deleteCustomer);

module.exports = router;
