const router = require("express").Router()

// CONTROLLERS
const {
    getCutomers,
    getCutomerById,
    setCustomer,
    updateCustomer,
    deleteCustomer
} = require('../controllers/customer.controller');

router.get("/", getCutomers);
router.get("/:id", getCutomerById);
router.post("/", setCustomer);
router.put("/:id", updateCustomer);
router.delete("/:id", deleteCustomer);

module.exports = router;