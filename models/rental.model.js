const Joi = require("joi");
const mongoose = require("mongoose");

const rentalSchema = new mongoose.Schema(
  {
    customer: {
      type: new mongoose.Schema({
        firstName: { type: String, required: true, trim: true, maxlength: 60 },
        lastName: {
          type: String,
          required: function () {
            return this.firstName;
          },
          trim: true,
          maxlength: 60,
        },
        isGold: {
          type: Boolean,
          default: false,
        },
        phone: {
          type: String,
          required: true,
          minlength: 5,
          maxlength: 50,
        },
      }),
      required: true,
    },
    movie: {
      type: new mongoose.Schema({
        name: {
          type: String,
          required: true,
          trim: true,
          minlength: 5,
          maxlength: 255,
        },
        dailyRentalRate: {
          type: Number,
          required: true,
          min: 0,
          max: 255,
        },
      }),
      required: true,
    },
    dateOut: {
      type: Date,
      required: true,
      default: Date.now,
    },
    dateReturned: Date,
    rentalFee: { type: Number, min: 0 },
  },
  { timestamps: true }
);

const RentalModel = mongoose.model("Rental", rentalSchema);

const validateRental = (rental) =>
  Joi.object({
    customerId: Joi.objectId().required(),
    movieId: Joi.objectId().required(),
  }).validate(rental);

module.exports = {
  RentalModel,
  validateRental,
};
