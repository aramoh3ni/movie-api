const router = require("express").Router();
const { tryc } = require("../middleware");
const { authUser } = require("../controllers/auth.controller");

router.post("/", tryc(authUser));

module.exports = router;
