// MODELS
const { CustomerModel, validateCustomer } = require("../models/customer.model");

const getCutomers = async (req, res) => {
  const customers = await CustomerModel.find().sort("firstName");
  return !customers
    ? res.status(404).send("No Value.")
    : res.status(200).send(customers);
};
const getCutomerById = async (req, res) => {
  const { id } = req.params;
  const customer = await CustomerModel.findById(id);
  return !customer
    ? res.status(404).send("No Value.")
    : res.status(200).send(customer);
};
const setCustomer = async (req, res) => {
  const { error } = validateCustomer(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const newCustomer = new CustomerModel({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    birthYear: req.body.birthYear,
    phone: req.body.phone,
    location: req.body.location,
  });

  const result = await newCustomer.save();
  return !result
    ? res.status(400).send("Item not inserted!")
    : res.status(201).send(result);
};
const updateCustomer = async (req, res) => {
  const { id } = req.params;
  const { error } = validateCustomer(req.body);
  if (error) return res.status(400).send(error.details[0].message);

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
  return !customer
    ? res.status(400).send("There is no customer with current ID.")
    : res.status(201).send(customer);
};
const deleteCustomer = async (req, res) => {
  const { id } = req.params;
  const customer = await CustomerModel.findByIdAndRemove(id);
  return !customer
    ? res.status(404).send("There is no customer with this ID.")
    : res.status(200).send("Delete Successfully");
};

module.exports = {
  getCutomers,
  getCutomerById,
  setCustomer,
  updateCustomer,
  deleteCustomer,
};
