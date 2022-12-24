// create promise
const prms = new Promise((resolve, reject) => {
  // Kick off some async work
  // Access a database
  // call a web service
  // start timer

  // pending => resolved, rejected

  // if operation complete success
  // resolve(1);

  // if going to wronge
  // reject(new Error("message"));

  setTimeout(() => {
    // resolve(1);
    reject(new Error("Operation Faild."));
  }, 1000);
});

// Consume a Promise
prms
  .then((result) => console.log("Result", result))
  .catch((err) => console.log("Error", err.message));
