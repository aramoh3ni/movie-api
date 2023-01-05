const createError = require("http-errors");
const mongoose = require("mongoose");

const { mongodb_msgs } = require("../constants/message");

module.exports = function (req, res, next) {
  if (!mongoose.Types.ObjectId.isValid(req.params.id || req.user._id)) {
    throw createError.NotFound(mongodb_msgs.object_id);
  }
  next();
};
