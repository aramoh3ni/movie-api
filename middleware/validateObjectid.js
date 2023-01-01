const createError = require("http-errors");
const mongoose = require("mongoose");

const { mongodb_msgs } = require("../constants/message");

module.exports = async function (req, res, next) {
  try {
    const id = req.params.id ? req.params.id : req.user._id;
    const validId = await mongoose.isValidObjectId(id);
    if (!validId) throw createError.UnprocessableEntity(mongodb_msgs.object_id);
    next();
  } catch (error) {
    throw createError.BadRequest(error.message);
  }
};
