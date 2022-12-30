const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Joi = require("joi");
const { UserModel } = require("../models/users.model");
module.exports = {
  authUser: async (req, res) => {
    try {
      const { error } = validateAuth(req.body);
      if (error) return res.status(400).json(error.details[0].message);

      let user = await UserModel.findOne({ email: req.body.email });
      if (!user) return res.status(400).json("Invalid Email or Password");

      const validPassword = await bcrypt.compare(
        req.body.password,
        user.password
      );
      if (!validPassword)
        return res.status(400).json("Invalid Email or Password.");

      const fullName = user.firstName + " " + user.lastName;
      const token = jwt.sign({
        _id: user.id,
        name: fullName,
        isAdmin: user.isAdmin,
      }, process.env.TOKEN_SECERT);

      res.status(200).json(token);
    } catch (error) {
      res.status(500).json(error.message);
    }
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
    password: Joi.string().required(),
  }).validate(user);
