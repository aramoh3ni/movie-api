const moment = require("moment");
const mongoose = require("mongoose");
const request = require("supertest");
const { MovieModel } = require("../../models/movie.model.js");
const { RentalModel } = require("../../models/rental.model.js");
const { UserModel } = require("../../models/users.model.js");

describe("/api/rentals", () => {
  let server;
  let customerId;
  let token;
  let rental;
  let movie;

  const execute = async () => {
    return await request(server)
      .post("/api/returns")
      .set("x-auth-token", token)
      .send({ customerId, movieId });
  };

  beforeEach(async () => {
    server = require("../../index.js");
    token = new UserModel({ isAdmin: true }).genAuthToken();
    customerId = mongoose.Types.ObjectId();
    movieId = mongoose.Types.ObjectId();

    movie = new MovieModel({
      _id: movieId,
      name: "12345",
      coverImageUrl: "https://123.org/love.jpg",
      dailyRentalRate: 2,
      genre: { name: "12345" },
      numberInStock: 10,
    });
    await movie.save();

    rental = new RentalModel({
      customer: {
        _id: customerId,
        firstName: "Alireza",
        lastName: "Mohseni",
        phone: "1234567890",
      },
      movie: {
        _id: movieId,
        name: "12345",
        dailyRentalRate: 2,
      },
    });

    await rental.save();
  });
  afterEach(async () => {
    await server.close();
    await RentalModel.remove({});
    await MovieModel.remove({});
  });

  it("should return 403 if client is not logged in.", async () => {
    token = "1234";
    const res = await execute();
    expect(res.status).toBe(403);
  });

  it("should return 400 if customer with id given is not exists.", async () => {
    customerId = "";
    const res = await execute();
    expect(res.status).toBe(400);
  });

  it("should return 400 if movie with id given is not exists.", async () => {
    movieId = "";
    const res = await execute();
    expect(res.status).toBe(400);
  });

  it("should return 404 if not rental is exists for customer/movie combination.", async () => {
    await RentalModel.remove();
    const res = await execute();
    expect(res.status).toBe(404);
  });

  it("should return 400 if return is already proccessed.", async () => {
    // await RentalModel.updateOne(
    //   { "customer._id": customerId, "movie._id": movieId },
    //   { $set: { dateReturned: "2023-10-10" } },
    //   { new: true }
    // );

    rental.dateReturned = new Date();
    await rental.save();

    const res = await execute();

    expect(res.status).toBe(400);
  });

  it("should return 200 if return process if sucess.", async () => {
    const res = await execute();
    expect(res.status).toBe(200);
  });

  it("should return returnDate if input in valid.", async () => {
    await execute();

    const rentalInDB = await RentalModel.findById(rental._id);
    const diffDate = new Date() - rentalInDB.dateReturned;

    expect(diffDate).toBeLessThan(10 * 1000);
  });

  it("shoudl return rentalFee if input in valid.", async () => {
    rental.dateOut = moment().add(-7, "days").toDate();
    await rental.save();

    await execute();

    const rentalInDB = await RentalModel.findById(rental._id);
    expect(rentalInDB.rentalFee).toBeDefined();
    expect(rentalInDB.rentalFee).toBe(14);
  });

  it("should return Increase Number in stock if input is valid.", async () => {
    await execute();

    const movieInDB = await MovieModel.findById(movieId);

    expect(movieInDB.numberInStock).toBe(movie.numberInStock + 1);
  });

  it("should return Increase Number in stock if input is valid.", async () => {
    const res = await execute();

    const rentalInDB = await RentalModel.findById(rental._id);

    expect(Object.keys(res.body.data)).toEqual(
      expect.arrayContaining([
        "_id",
        "customer",
        "movie",
        "dateOut",
        "createdAt",
        "updatedAt",
        "__v",
        "dateReturned",
        "rentalFee",
      ])
    );
  });
});
