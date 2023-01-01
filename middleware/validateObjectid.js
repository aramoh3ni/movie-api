const createError = require("http-errors");
const mongoose = require("mongoose")
module.exports = async function(req, res, next) {
    try {
        const id = req.params.id ? req.params.id : req.user._id
        const validId = await mongoose.isValidObjectId(id);
        if (!validId) throw createError.BadRequest("Invalid Token.")
        next();
    } catch (error) {
        next(error)
    }
}