const createError = require("http-errors");
const jwt = require("jsonwebtoken");

const { authorization_msgs, auth_token_msgs } = require("../constants/message");

module.exports = function auth(req, res, next) {
  try {
    const token = req.header("x-auth-token");
    if (!token)
      throw createError.Unauthorized(authorization_msgs.access_denied);

    const payload = jwt.verify(token, process.env.ACCESS_TOKEN_SECERT);
    if (!payload) throw createError.Unauthorized(auth_token_msgs.invalid);
    req.user = payload;
    next();
  } catch (error) {
    res.status(500).json(auth_token_msgs.invalid);
  }
};
