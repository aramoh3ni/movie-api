const router = require("express").Router();

const { authUser } = require("../controllers/auth.controller");

router.post("/", authUser);

module.exports = router;
