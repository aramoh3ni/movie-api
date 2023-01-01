const createError = require("http-errors");
const { RentalModel, validateRental } = require("../models/rental.model");
const { CustomerModel } = require("../models/customer.model");
const { MovieModel } = require("../models/movie.model");
const { messages } = require("../constants/message");
const msg = messages("Rental");

const getRentals = async (req, res) => {
  const rentals = await RentalModel.find().sort("-outDate");
  throw !rentals
    ? createError.NotFound(msg.not_found)
    : res.status(200).json({ data: rentals });
};

const getRentalById = async (req, res) => {
  const { id } = req.params;
  const rental = await RentalModel.findById(id);
  throw !rental
    ? createError.NotFound(msg.not_found)
    : res.status(200).json({ data: rental });
};

const setRental = async (req, res) => {
  const { customerId, movieId } = req.body;
  const { error } = validateRental({ customerId, movieId });
  if (error) throw createError.BadRequest(error.details[0].message);

  const customer = await CustomerModel.findById(customerId);
  if (!customer) throw createError.NotFound(messages("Customer").not_found);

  const movie = await MovieModel.findById(movieId);
  if (!movie) throw createError.NotFound(msg.not_found);

  let rental = new RentalModel({
    customer: {
      _id: customer._id,
      firstName: customer.firstName,
      lastName: customer.lastName,
      isGold: customer.isGold,
      phone: customer.phone,
    },
    movie: {
      _id: movie._id,
      name: movie.name,
      dailyRentalRate: movie.dailyRentalRate,
    },
  });

  await rental.save();
  movie.numberInStock--;
  await movie.save();

  throw !rental
    ? createError.BadRequest(msg.create_error)
    : res.status(201).json({ data: rental, message: msg.create });
};

module.exports = { getRentalById, getRentals, setRental };
