const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");
const _ = require("lodash");
const { UserModel, validateUser } = require("../models/users.model");

module.exports = {
  getUsers: async (req, res) => {
    try {
      const users = await UserModel.find().select("-password -__v");
      return !users
        ? res.status(404).json("No Value")
        : res.status(200).json(users);
    } catch (error) {
      res.status(500).json(error.message);
    }
  },
  getUserById: async (req, res) => {},
  setUser: async (req, res) => {
    try {
      const { error } = validateUser(req.body);
      if (error) return res.status(400).json(error.details[0].message);

      const userExists = await UserModel.findOne({ email: req.body.email });
      if (userExists) return res.status(400).json("User already Exists");

      let user = new UserModel(
        _.pick(req.body, [
          "firstName",
          "lastName",
          "email",
          "password",
          "imageUrl",
        ])
      );
      
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(user.password, salt);
      
      user = await user.save();
      
      const fullName = user.firstName + " " + user.lastName;
      const token = jwt.sign({
        _id: user.id,
        name: fullName,
        isAdmin: user.isAdmin,
      }, process.env.TOKEN_SECERT);

      res.status(201).header("x-auth-token", token).json(_.pick(user, ["firstName", "lastName", "email"]));
    } catch (error) {
      res.status(500).json(error.message);
    }
  },
  delettUser: async (req, res) => {},
  updattUser: async (req, res) => {},
};
