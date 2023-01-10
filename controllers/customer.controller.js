// MODELS
const { CustomerModel } = require("../models/customer.model");
const createError = require("http-errors");

const { messages } = require("../constants/message");
const msg = messages("Customer");

const getCutomers = async (req, res) => {
  const customers = await CustomerModel.find().select("-__v").sort("firstName");
  throw !customers
    ? createError.NotFound(msg.not_found)
    : res.status(200).send({ data: customers });
};
const getCutomerById = async (req, res) => {
  const { id } = req.params;
  const customer = await CustomerModel.findById(id);
  throw !customer
    ? createError.NotFound(msg.not_found)
    : res.status(200).send({ data: customer });
};
const setCustomer = async (req, res) => {
  let customer = new CustomerModel({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    birthYear: req.body.birthYear,
    phone: req.body.phone,
    location: req.body.location,
  });

  customer = await customer.save();
  throw !customer
    ? createError.BadRequest(msg.create_error)
    : res.status(201).send({ message: msg.create, data: customer });
};
const updateCustomer = async (req, res) => {
  const { id } = req.params;

  let customer = await CustomerModel.findByIdAndUpdate(
    id,
    {
      $set: {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        birthYear: req.body.birthYear,
        phone: req.body.phone,
        location: req.body.location,
      },
    },
    {
      new: true,
    }
  );
  throw !customer
    ? createError.NotFound(msg.update_error)
    : res.status(201).send({ message: msg.update, data: customer });
};
const deleteCustomer = async (req, res) => {
  const { id } = req.params;
  const customer = await CustomerModel.findByIdAndRemove(id);
  throw !customer
    ? createError.NotFound(msg.delete_error)
    : res.status(200).send(msg.delete);
};

module.exports = {
  getCutomers,
  getCutomerById,
  setCustomer,
  updateCustomer,
  deleteCustomer,
};
