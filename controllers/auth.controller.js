const bcrypt = require("bcrypt");
const Joi = require("joi");
const { UserModel } = require("../models/users.model");
module.exports = {
  authUser: async (req, res) => {
    try {
      const { error } = validateAuth(req.body);
      if (error) return res.status(400).send(error.details[0].message);

      let user = await UserModel.findOne({ email: req.body.email });
      if (!user) return res.status(400).send("Invalid Email or Password");

      const validPassword = await bcrypt.compare(
        req.body.password,
        user.password
      );
      if (!validPassword)
        return res.status(400).send("Invalid Email or Password.");

      const token = user.genAuthToken();

      res.status(200).header("x-auth-token", token).send(token);
    } catch (error) {
      res.status(500).send(error.message);
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
