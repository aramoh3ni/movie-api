const createError = require("http-errors");
const Joi = require("joi");
const _ = require("lodash");
const { UserModel, validateUser } = require("../models/users.model");

const msg = require("../constants/message").messages("User");

module.exports = {
  getMe: async (req, res) => {
    const user = await UserModel.findById(req.user._id).select(
      "-password -__v"
    );
    throw !user
      ? createError.NotFound(msg.not_found)
      : res.status(200).json({ data: user });
  },

  updateMe: async (req, res) => {
    const { error } = validateMe(req.body);
    if (error) throw createError.BadRequest(error.details[0].message);

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
    throw !user
      ? createError.BadRequest(msg.update_error)
      : res.status(200).json({ data: user, message: msg.update });
  },
  getUsers: async (req, res) => {
    const users = await UserModel.find().select("-password -__v");
    return !users
      ? createError.NotFound(msg.not_found)
      : res.status(200).json({ data: users });
  },
  getUserById: async (req, res) => {
    const { id } = req.params;
    const user = await UserModel.findById(id);
    throw !user
      ? createError.NotFound(msg.not_found)
      : res.status(200).json({ data: user });
  },
  setUser: async (req, res) => {
    const { error } = validateUser(req.body);
    if (error) throw createError.BadRequest(error.details[0].message);

    const userExists = await UserModel.findOne({ email: req.body.email });
    if (userExists) throw createError.BadRequest(msg.item_exists);

    let user = new UserModel(
      _.pick(req.body, ["firstName", "lastName", "email", "password"])
    );
    user = await user.save();
    const token = user.genAuthToken();
    throw !user
      ? createError.BadRequest(msg.create_error)
      : res
          .status(201)
          .header("x-auth-token", token)
          .json({
            data: _.pick(user, ["firstName", "lastName", "email"]),
            message: msg.create,
          });
  },
};

const validateMe = (user) =>
  Joi.object({
    firstName: Joi.string().min(2).max(64).label("Firstname"),
    lastName: Joi.string().min(2).max(54).label("Lastname"),
  }).validate(user);
