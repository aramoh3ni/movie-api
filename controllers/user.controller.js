const bcrypt = require("bcrypt");
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
  getUserById: async (req, res) => {},
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
  delettUser: async (req, res) => {},
  updattUser: async (req, res) => {},
};
