// MODELS
const { CustomerModel, validateCustomer } = require("../models/customer.model");

const getCutomers = async (req, res) => {
  try {
    const customers = await CustomerModel.find().sort("firstName");
    return !customers
      ? res.status(404).json("No Value.")
      : res.status(200).send(customers);
  } catch (error) {
    res.status(400).json(error.message);
  }
};
const getCutomerById = async (req, res) => {
  try {
    const { id } = req.params;
    const customer = await CustomerModel.findById(id);
    return !customer
      ? res.status(404).json("No Value.")
      : res.status(200).send(customer);
  } catch (error) {
    res.status(400).json(error.message);
  }
};
const setCustomer = async (req, res) => {
  try {
    const { error } = validateCustomer(req.body);
    if (error) return res.status(400).json(error.details[0].message);

    let customer = await CustomerModel.findOne({ userId: req.body.userId });
    if (customer) return res.status(400).send("Customer Aleary Exists.");

    const newCustomer = new CustomerModel(req.body);

    const result = await newCustomer.save();
    return !result
      ? res.status(400).json("Item not inserted!")
      : res.status(201).json(result);
  } catch (err) {
    return res.status(400).json(err.message);
  }
};
const updateCustomer = async (req, res) => {
  try {
    const { id } = req.params;
    const { error } = validateCustomer(req.body);
    if (error) return res.status(400).json(error.details[0].message);

    let customer = await CustomerModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    return !customer
      ? res.status(400).send("There is no customer with current ID.")
      : res.status(201).json(customer);
  } catch (err) {
    return res.status(400).json(err.message);
  }
};
const deleteCustomer = async (req, res) => {
  try {
    const { id } = req.params;
    const customer = await CustomerModel.findByIdAndRemove(id);
    return !customer
      ? res.status(404).json("There is no customer with this ID.")
      : res.status(200).json("Delete Successfully");
  } catch (error) {
    res.status(400).json(error.message);
  }
};

module.exports = {
  getCutomers,
  getCutomerById,
  setCustomer,
  updateCustomer,
  deleteCustomer,
};
