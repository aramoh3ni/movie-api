const Joi = require("joi");
const mongoos = require("mongoose");

const customerSchema = new mongoos.Schema({
  firstName: { type: String, required: true, trim: true, maxlength: 60 },
  lastName: {
    type: String,
    required: function () {
      return this.firstName;
    },
    trim: true,
    maxlength: 60,
  },
  code: String,
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
  intersts: { type: Array, of: String },
  location: String,
});

customerSchema.pre("save", async function (next) {
  try {
    const name = `${this.lastname}`.replace(" ", "");
    const formatedCode = `${name}_${new Date().getFullYear()}_${new Date().getMonth()}_${Math.floor(
      Math.random() * 1000
    )}`;
    this.code = formatedCode;
    next();
  } catch (exception) {
    next(exception);
  }
});

const validateCustomer = (customer) => {
  return Joi.object({
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
    location: Joi.string().trim().lowercase().label("Location"),
  }).validate(customer);
};
const CustomerModel = mongoos.model("Customer", customerSchema);

module.exports = {
  CustomerModel,
  customerSchema,
  validateCustomer,
};
