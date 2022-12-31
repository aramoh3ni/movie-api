const _ = require("lodash");
const bcrypt = require("bcrypt");
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
  const payload = { _id: this._id, isAdmin: this.isAdmin };
  const secret = process.env.TOKEN_SECERT;
  const options = {
    expiresIn: "1hr",
    issuer: "pickurapage.com",
    audience: `${this._id}`,
  };
  const token = jwt.sign(payload, secret, options);
  return token;
};

userSchema.pre("save", async function (next) {
  try {
    const salt = await bcrypt.genSalt(15);
    const hashedPassword = await bcrypt.hash(this.password, salt);
    this.password = hashedPassword;
    next();
  } catch (error) {
    console.log(error.message);
    return;
  }
});

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
    password: Joi.string()
      .min(6)
      .max(1024)
      .pattern(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
      )
      .required(),
  }).validate(user);

module.exports = {
  UserModel,
  userSchema,
  validateUser,
};
