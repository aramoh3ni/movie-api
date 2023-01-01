const { RentalModel, validateRental } = require("../models/rental.model");
const { CustomerModel } = require("../models/customer.model");
const { MovieModel } = require("../models/movie.model");

const getRentals = async (req, res) => {
  const rentals = await RentalModel.find().sort("-outDate");
  return !rentals
    ? res.status(404).send("No Value")
    : res.status(200).send(rentals);
};

const getRentalById = async (req, res) => {
  const { id } = req.params;
  const rental = await RentalModel.findById(id);
  return !rental
    ? res.status(400).send("Invalid Rental.")
    : res.status(200).send(rental);
};

const setRental = async (req, res) => {
  const { customerId, movieId } = req.body;
  const { error } = validateRental({ customerId, movieId });
  if (error) return res.status(400).send(error.details[0].message);

  const customer = await CustomerModel.findById(customerId);
  if (!customer) return res.status(400).send("Invalid Customer.");
  const movie = await MovieModel.findById(movieId);
  if (!movie) return res.status(400).send("Invalid Movie.");

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

  return !rental
    ? res.status(400).send("Invalid Rental Object")
    : res.status(201).send(rental);
};

module.exports = { getRentalById, getRentals, setRental };
