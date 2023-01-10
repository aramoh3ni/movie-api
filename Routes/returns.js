const router = require("express").Router();
const { auth, isAdmin, tryc, validateBody } = require("../middleware");

const {
  setReturns,
  validateReturns,
} = require("../controllers/returns.controller");

router.post(
  "/",
  auth,
  isAdmin,
  validateBody(validateReturns),
  tryc(setReturns)
);

module.exports = router;
