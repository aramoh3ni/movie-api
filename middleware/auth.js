const createError = require("http-errors");
const jwt = require("jsonwebtoken");

const { authorization_msgs, auth_token_msgs } = require("../constants/message");

module.exports = (req, res, next) => {
  const token = req.header("x-auth-token");
  if (!token) throw createError.Unauthorized(authorization_msgs.access_denied);

  const payload = jwt.verify(token, process.env.ACCESS_TOKEN_SECERT);
  if (!payload)
    throw createError.Unauthorized(authorization_msgs.access_denied);
  req.user = payload;
  next();
};
