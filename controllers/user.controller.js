const Joi = require("joi");
const _ = require("lodash");
const { UserModel, validateUser } = require("../models/users.model");

module.exports = {
  getMe: async (req, res) => {
    try {
      const user = await UserModel.findById(req.user._id).select(
        "-password -__v"
      );
      res.status(200).send(user);
    } catch (error) {
      res.status(400).send("An Authorized User");
    }
  },
  updateMe: async (req, res) => {
    try {
      const { error } = validateMe(req.body);
      if (error) return res.status(400).send(error.details[0].message);

      user = await UserModel.findByIdAndUpdate(
        req.user._id,
        {
          $set: {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
          },
        },
        { new: true }
      );
      if (!user) return res.status(400).send("Invalid Account.");

      res.status(200).send(user);
    } catch (error) {
      res.status(400).send(error.message);
    }
  },
  getUsers: async (req, res) => {
    try {
      const users = await UserModel.find().select("-password -__v");
      return !users
        ? res.status(404).send("No Value")
        : res.status(200).send(users);
    } catch (error) {
      res.status(500).send(error.message);
    }
  },
  getUserById: async (req, res) => {
    try {
      const { id } = req.params;
      const user = await UserModel.findById(id);
      if (!user) return res.status(404).send("User Not Found.");

      res.status(200).send(user);
    } catch (error) {
      res.status(400).send(error.message);
    }
  },
  setUser: async (req, res) => {
    try {
      const { error } = validateUser(req.body);
      if (error) return res.status(400).send(error.details[0].message);

      const userExists = await UserModel.findOne({ email: req.body.email });
      if (userExists.disable && userExists.disable === true) {
        await userExists.updateOne(
          {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            disable: false,
          },
          { new: true }
        );
        const token = userExists.genAuthToken();
        return res
          .status(201)
          .header("x-auth-token", token)
          .send(_.pick(userExists, ["firstName", "lastName", "email"]));
      }
      if (userExists && !userExists.disable)
        return res.status(400).send("User already Exists");

      let user = new UserModel(
        _.pick(req.body, ["firstName", "lastName", "email", "password"])
      );
      user = await user.save();
      const token = user.genAuthToken();
      res
        .status(201)
        .header("x-auth-token", token)
        .send(_.pick(user, ["firstName", "lastName", "email"]));
    } catch (error) {
      res.status(500).send(error.message);
    }
  },
};

const validateMe = (user) =>
  Joi.object({
    firstName: Joi.string().min(2).max(64).label("Firstname"),
    lastName: Joi.string().min(2).max(54).label("Lastname"),
  }).validate(user);
