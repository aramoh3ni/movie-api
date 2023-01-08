const router = require("express").Router();
const { auth, isAdmin, tryc } = require("../middleware");

const { setReturns } = require("../controllers/returns.controller");

router.post("/", auth, isAdmin, tryc(setReturns));

module.exports = router;
