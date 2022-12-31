// MODELS
const { CustomerModel, validateCustomer } = require("../models/customer.model");

const getCutomers = async (req, res) => {
  try {
    const customers = await CustomerModel.find().sort("firstName");
    return !customers
      ? res.status(404).send("No Value.")
      : res.status(200).send(customers);
  } catch (error) {
    res.status(400).send(error.message);
  }
};
const getCutomerById = async (req, res) => {
  try {
    const { id } = req.params;
    const customer = await CustomerModel.findById(id);
    return !customer
      ? res.status(404).send("No Value.")
      : res.status(200).send(customer);
  } catch (error) {
    res.status(400).send(error.message);
  }
};
const setCustomer = async (req, res) => {
  try {
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
  } catch (err) {
    return res.status(400).send(err.message);
  }
};
const updateCustomer = async (req, res) => {
  try {
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
  } catch (err) {
    return res.status(400).send(err.message);
  }
};
const deleteCustomer = async (req, res) => {
  try {
    const { id } = req.params;
    const customer = await CustomerModel.findByIdAndRemove(id);
    return !customer
      ? res.status(404).send("There is no customer with this ID.")
      : res.status(200).send("Delete Successfully");
  } catch (error) {
    res.status(400).send(error.message);
  }
};

module.exports = {
  getCutomers,
  getCutomerById,
  setCustomer,
  updateCustomer,
  deleteCustomer,
};
