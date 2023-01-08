// :: TODO
// :: DONE => /api/rentals/return
// :: DONE => Return 401 if client is not logged in.
// :: DONE => Return 400 if customerId is not provided
// :: DONE => Return 400 if movieid is not Provided
// :: DONE => Return 404 if no rental found for this customer
// Return 400 if rental is aleardy proccessed
// Return 200 if valid request
// Set the return date
// Calculate the rental fee
// increase number in the stock
// Return renatal object to the client.
const moment = require("moment");
const createError = require("http-errors");
const { CustomerModel } = require("../models/customer.model");
const { MovieModel } = require("../models/movie.model");
const { RentalModel } = require("../models/rental.model");

const setReturns = async (req, res) => {
  if (!req.body.customerId)
    return res.status(400).send("customer id is not Provided.");
  if (!req.body.movieId)
    return res.status(400).send("Movie id is not provied.");

  const rental = await RentalModel.findOne({
    "customer._id": req.body.customerId,
    "movie._id": req.body.movieId,
  });

  if (!rental) return res.status(404).send("Invalid Rental is provied.");

  if (rental.dateReturned)
    return res.status(400).send("Rental already processed.");

  rental.dateReturned = new Date();

  const days = new Date() - 10;
  rental.rentalFee = rental.movie.dailyRentalRate * days;

  rental.rentalFee =
    moment().diff(rental.dateOut, "days") * rental.movie.dailyRentalRate;

  await rental.save();

  res.status(200).send("Sucess");
};

module.exports = { setReturns };
