const createError = require("http-errors");

module.exports = (validator) => (req, res, next) => {
  try {
    const { error } = validator(req.body);
    if (error) throw createError.BadRequest(error.details[0].message);
    next();
  } catch (error) {
    throw createError.BadRequest(error.message);
  }
};
