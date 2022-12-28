const Joi = require("joi");
const mongoose = require("mongoose");

// NESSACERY MODLES
const { genreSchema } = require("./genre.model");

const movieSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 100,
      unique: true,
    },
    tags: {
      type: Array,
      required: function (v) {
        return v && v.length > 0;
      },
      lowercase: true,
    },
    trailerUrl: String,
    coverImageUrl: { type: String, required: true },
    numberInStock: { type: Number, required: true, min: 1, max: 100 },
    dailyRentalRate: {
      type: Number,
      default: 0.0,
      min: 0,
      max: 10,
      required: true,
    },
    genre: {
      type: genreSchema,
      required: true,
    },
    likes: {
      type: Array,
      default: [],
    },
    isPublished: { type: Boolean, default: false },
    releasedOn: { type: Number, min: 1, max: 2022 },
    price: {
      type: Number,
      required: function () {
        return this.isPublished;
      },
    },
  },
  { timestamps: true }
);

const validateMovie = (movie) => {
  const result = Joi.object({
    name: Joi.string().min(6).max(255).strip().required().label("Title"),
    genre: Joi.string().required(),
    coverImageUrl: Joi.string().required().label("Cover Image"),
    trailerUrl: Joi.string().label("Trailer Image"),
    price: Joi.number().integer().label("Price"),
    isPublished: Joi.boolean().label("Publish"),
    releasedOn: Joi.number().min(1).max(2022).label("Released Year"),
    numberInStock: Joi.number()
      .integer()
      .min(1)
      .max(100)
      .required()
      .label("Number in Stock"),
    dailyRentalRate: Joi.number()
      .min(0)
      .max(10)
      .required()
      .label("Daily Rental Rate"),
  }).validate(movie);
  return result;
};

const MovieModel = mongoose.model("Movie", movieSchema);

module.exports = { MovieModel, validateMovie };
