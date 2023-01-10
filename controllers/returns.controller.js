const Joi = require("joi");
const moment = require("moment");
const createError = require("http-errors");

const { MovieModel } = require("../models/movie.model");
const { RentalModel } = require("../models/rental.model");

const { returns_msgs } = require("../constants/message");

const setReturns = async (req, res) => {
  const rental = await RentalModel.lookup(
    req.body.customerId,
    req.body.movieId
  );

  if (!rental) throw createError.NotFound(returns_msgs.rental_not_created);

  if (rental.dateReturned) throw createError.BadRequest(returns_msgs.processed);

  rental.dateReturned = new Date();

  rental.rentalFee =
    moment().diff(rental.dateOut, "days") * rental.movie.dailyRentalRate;

  await rental.save();

  await MovieModel.findByIdAndUpdate(
    req.body.movieId,
    { $inc: { numberInStock: 1 } },
    { new: true }
  );

  res.status(200).send({ message: returns_msgs.sucess, data: rental });
};

const validateReturns = (req) =>
  Joi.object({
    customerId: Joi.objectId().required(),
    movieId: Joi.objectId().required(),
  }).validate(req);

module.exports = { setReturns, validateReturns };
