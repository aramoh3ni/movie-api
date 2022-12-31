const Joi = require("joi");
const bcrypt = require("bcrypt");
const _ = require("lodash");
const { UserModel, validateUser } = require("../models/users.model");

module.exports = {
  getMe: async (req, res) => {
    try {
      const user = await UserModel.findById(req.user._id).select(
        "-password -__v"
      );
      if (user.disable) return res.status(400).send("Invalid Account.");
      res.status(200).send(user);
    } catch (error) {
      res.status(400).send("An Authorized User");
    }
  },
  deleteMe: async (req, res) => {
    try {
      const { password } = req.body;
      const { error } = validatePassword({ password });
      if (error) return res.status(400).send("Invalid Credential.");

      let user = await UserModel.findById(req.user._id).select("-__v");
      if (!user) return res.status(400).send("Invalid Email or Password.");

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(401).send("Invalid Credential.");

      user = await UserModel.findByIdAndUpdate(
        user._id,
        { $set: { disable: true } },
        { new: true }
      );
      if (!user) return res.status(400).send("Invalid Email or Password2222.");

      res.status(200).send("Sorry! Your Account Is Deleted.");
    } catch (error) {
      res.status(400).send(error.message);
    }
  },
  updateMe: async (req, res) => {},
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
      if (userExists) return res.status(400).send("User already Exists");

      let user = new UserModel(
        _.pick(req.body, [
          "firstName",
          "lastName",
          "email",
          "password",
          "imageUrl",
        ])
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

const validatePassword = (password) =>
  Joi.object({
    password: Joi.string()
      .min(6)
      .max(1024)
      .pattern(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
      )
      .required(),
  }).validate(password);
