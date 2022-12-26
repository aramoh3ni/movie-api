const Joi = require("joi");
const mongoose = require("mongoose");

const genreSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 50,
      lowercase: true,
      trim: true,
    },
  },
  { timestamps: true }
);

const validateGenre = (genre) => {
  return Joi.object({
    name: Joi.string()
      .lowercase()
      .trim()
      .min(5)
      .max(50)
      .required()
      .label("Genre Title"),
  }).validate(genre);
};

const GenreModel = mongoose.model("Genre", genreSchema);

module.exports = {
  GenreModel,
  genreSchema,
  validateGenre,
};
