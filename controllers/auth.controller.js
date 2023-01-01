const _ = require("lodash");
const createError = require("http-errors");
const Joi = require("joi");
const { UserModel } = require("../models/users.model");

const { login } = require("../constants/message");

module.exports = {
  authUser: async (req, res) => {
    const { email, password } = req.body;
    const { error } = validateAuth({ email, password });
    if (error) throw createError.BadRequest(login[400]);

    let user = await UserModel.findOne({ email }).select(
      "-__v"
    );
    if (!user) throw createError.BadRequest(login[400]);

    const isMatch = await user.isValidPassword(password);
    if (!isMatch) throw createError.BadRequest(login[400]);

    const token = user.genAuthToken();

    res.status(200).header("x-auth-token", token).send({
      message: login[200],
      token,
      data: _.pick(user, ['firstName', 'lastName', 'email']),
    });
  },
};

const validateAuth = (user) =>
  Joi.object({
    email: Joi.string()
      .required()
      .email()
      .min(5)
      .max(255)
      .label("Email Address"),
    password: Joi.string()
      .min(6)
      .max(1024)
      .pattern(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
      )
      .required(),
  }).validate(user);
