module.exports = (err, req, res, next) => {
  // error
  // warn
  // info
  // verbose
  // debug
  // silly
  res.status(500).send({
    code: err.code,
    message: err.message,
    name: err.name,
  });
};

// function tryCatch(handler) {
//   // factory method
//   // if we didnot return method got and error because in express we only pass the method and express will call that.
//   return async (req, res, next) => {
//     try {
//       await handler(req, res);
//     } catch (exeption) {
//       next(exeption);
//     }
//   };
// }
