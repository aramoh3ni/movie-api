module.exports = (err, req, res, next) => {
  // error
  // warn
  // info
  // verbose
  // debug
  // silly
  console.log(err);
  res.status(err.status || 500);
  res.send({
    error: { status: err.status || 500, message: err.message, name: err.name },
  });
};
