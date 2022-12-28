const Joi = require("joi");
const mongoos = require("mongoose");

const customerSchema = mongoos.Schema({
  userId: { type: String, required: true },
  firstName: { type: String, required: true, trim: true, maxlength: 60 },
  lastName: {
    type: String,
    required: function () {
      return this.firstName;
    },
    trim: true,
    maxlength: 60,
  },
  birthYear: { type: Number, min: 1980, max: 2014 },
  isGold: { type: Boolean, default: false },
  phone: {
    type: String,
    required: function () {
      return this.isGold;
    },
    default: "",
    unique: true,
  },
  imageUrl: String,
  intersts: { type: Array, of: String },
  location: String,
});

const validateCustomer = (customer) => {
  return Joi.object({
    userId: Joi.string().required(),
    firstName: Joi.string()
      .lowercase()
      .trim()
      .max(60)
      .required()
      .label("Firstname"),
    lastName: Joi.string()
      .lowercase()
      .trim()
      .max(60)
      .required()
      .label("Lastname"),
    birthYear: Joi.number().integer().max(2014).min(1980).label("Birthyear"),
    phone: Joi.string().trim().min(9).max(12).label("Phone Number"),
    intersts: Joi.array(),
    imageUrl: Joi.string().trim(),
    location: Joi.string().trim().lowercase().label("Location"),
  }).validate(customer);
};
const CustomerModel = new mongoos.model("Customer", customerSchema);

module.exports = {
  CustomerModel,
  customerSchema,
  validateCustomer,
};
