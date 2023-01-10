// :: TODO
// :: DONE => /api/rentals/return
// :: DONE => Return 401 if client is not logged in.
// :: DONE => Return 400 if customerId is not provided
// :: DONE => Return 400 if movieid is not Provided
// :: DONE => Return 404 if no rental found for this customer
// :: DONE => Return 400 if rental is aleardy proccessed
// :: DONE => Return 200 if valid request
// :: DOBE => Set the return date
// :: DONE => Calculate the rental fee
// increase number in the stock
// Return renatal object to the client.
const moment = require("moment");
const createError = require("http-errors");

const { MovieModel } = require("../models/movie.model");
const { RentalModel } = require("../models/rental.model");

const setReturns = async (req, res) => {
  const rental = await RentalModel.findOne({
    "customer._id": req.body.customerId,
    "movie._id": req.body.movieId,
  });

  if (!rental)
    throw createError.NotFound(
      "Sorry!, Rental Process did not created before."
    );

  if (rental.dateReturned)
    throw createError.BadRequest("Sorry!, Rental already processed.");

  rental.dateReturned = new Date();

  rental.rentalFee =
    moment().diff(rental.dateOut, "days") * rental.movie.dailyRentalRate;

  await rental.save();

  await MovieModel.findByIdAndUpdate(
    req.body.movieId,
    { $inc: { numberInStock: 1 } },
    { new: true }
  );

  res.status(200).send({ data: rental });
};

module.exports = { setReturns };
