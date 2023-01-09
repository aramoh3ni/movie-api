const Joi = require("joi");

const router = require("express").Router();
const { auth, isAdmin, tryc, validateBody } = require("../middleware");

const { setReturns } = require("../controllers/returns.controller");

const validateReturns = (req) =>
  Joi.object({
    customerId: Joi.objectId().required(),
    movieId: Joi.objectId().required(),
  }).validate(req);

router.post(
  "/",
  auth,
  isAdmin,
  validateBody(validateReturns),
  tryc(setReturns)
);

module.exports = router;
