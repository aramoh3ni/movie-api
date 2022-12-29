const { RentalModel, validateRental } = require("../models/rental.model");
const { CustomerModel } = require("../models/customer.model");
const { MovieModel } = require("../models/movie.model");
const { default: mongoose } = require("mongoose");

const getRentals = async (req, res) => {
  try {
    const rentals = await RentalModel.find().sort("-outDate");
    return !rentals
      ? res.status(404).json("No Value")
      : res.status(200).json(rentals);
  } catch (err) {
    res.status(400).json(err.message);
  }
};

const getRentalById = async (req, res) => {
  try {
    const { id } = req.params;
    const rental = await RentalModel.findById(id);
    return !rental
      ? res.status(400).json("Invalid Rental.")
      : res.status(200).json(rental);
  } catch (err) {
    res.status(400).json(err.message);
  }
};

const setRental = async (req, res) => {
  try {
    const { isValid } = mongoose.Types.ObjectId;
    const { customerId, movieId } = req.body;
    const { error } = validateRental({ customerId, movieId });
    if (error) return res.status(400).json(error.details[0].message);

    if (!isValid(customerId) || !isValid(movieId))
      return res.status(400).json("Invalid Object id");

    const customer = await CustomerModel.findById(customerId);
    if (!customer) return res.status(400).json("Invalid Customer.");
    const movie = await MovieModel.findById(movieId);
    if (!movie) return res.status(400).json("Invalid Movie.");

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
    return !rental
      ? res.status(400).json("Invalid Rental Object")
      : res.status(201).json(rental);
  } catch (err) {
    res.status(400).json(err.message);
  }
};

module.exports = { getRentalById, getRentals, setRental };
