const createError = require("http-errors");
const { authorization_msgs } = require("../constants/message");
module.exports = function (req, res, next) {
  try {
    if (!req.user.isAdmin)
      throw createError.Forbidden(authorization_msgs.privlage_error);
    next();
  } catch (error) {
    createError.InternalServerError(error.message);
  }
};
