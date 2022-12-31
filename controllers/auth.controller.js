const bcrypt = require("bcrypt");
const Joi = require("joi");
const { UserModel } = require("../models/users.model");
module.exports = {
  authUser: async (req, res) => {
    try {
      const { email, password } = req.body;
      const { error } = validateAuth({ email, password });
      if (error) return res.status(400).send("Invalid Email or Password.");

      let user = await UserModel.findOne({ email });
      if (!user) return res.status(400).send("Invalid Email or Password.");

      const isMatch = await bcrypt.compare(password, user.password);
      if(!isMatch) return res.status(401).send("Invalid Email or Password");

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
      password: Joi.string()
      .min(6)
      .max(1024)
      .pattern(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
      ).required(),
  }).validate(user);
