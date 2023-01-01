module.exports = (handler) => async (req, res, next) => {
  try {
    await handler(req, res);
  } catch (error) {
    next(error);
  }
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
