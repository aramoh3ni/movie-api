async function notifyCustomer() {
  try {
    const customer = await getCustomer(1);
    console.log("Customer: ", customer);
    if (customer.isGold) {
      const movies = await getTopMovies(customer.isGold);
      console.log("Top Movies: ", movies);
      const email = await sendEmail(customer.email, movies);
      console.log(email);
    } else console.log("Access Denid.");
  } catch (err) {
    console.log(err.message);
  }
}
notifyCustomer();

function getCustomer(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        id: 1,
        name: "Alireza Mohseni",
        isGold: true,
        email: "alireza.mohseni.se@gmail.com",
      });
    }, 4000);
  });
}

function getTopMovies() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(["movie1", "movie2"]);
    }, 4000);
  });
}

function sendEmail(email, movies) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(`Email Send to : ${email}`);
    }, 4000);
  });
}
