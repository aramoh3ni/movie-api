const jwt = require("jsonwebtoken");
module.exports = function auth(req, res, next) {
  try {
    const token = req.header("x-auth-token");
    if (!token) return res.status(401).json("Access Denied.");

    const decoded = jwt.verify(token, process.env.TOKEN_SECERT);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(400).json("Invalid Token.");
  }
};
