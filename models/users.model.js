const _ = require("lodash");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true, minlength: 2, maxlength: 64 },
  lastName: { type: String, required: true, minlength: 2, maxlength: 64 },
  imageUrl: String,
  email: {
    type: String,
    required: true,
    unique: true,
    minlength: 5,
    maxlength: 255,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 1024,
  },
  isAdmin: Boolean,
});

// methods
userSchema.methods.genAuthToken = function () {
  return jwt.sign(
    { _id: this._id, isAdmin: this.isAdmin },
    process.env.TOKEN_SECERT
  );
};

const UserModel = mongoose.model("User", userSchema);

const validateUser = (user) =>
  Joi.object({
    firstName: Joi.string().required().min(2).max(64).label("Firstname"),
    lastName: Joi.string().required().min(2).max(54).label("Lastname"),
    imageUrl: Joi.string(),
    email: Joi.string()
      .required()
      .email()
      .min(5)
      .max(255)
      .label("Email Address"),
    password: Joi.string().min(6).max(1024).required(),
  }).validate(user);

module.exports = {
  UserModel,
  userSchema,
  validateUser,
};
