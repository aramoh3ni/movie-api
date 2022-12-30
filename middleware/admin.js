module.exports = function (req, res, next) {
  try {
    if (!req.user.isAdmin) return res.status(403).json("Forbidden.");
    next();
  } catch (error) {
    res.status(500).json(error.message);
  }
};
