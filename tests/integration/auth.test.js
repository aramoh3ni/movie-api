const jwt = require("jsonwebtoken");
const request = require("supertest");
const mongoose = require("mongoose");
const { UserModel } = require("../../models/users.model");
const { GenreModel } = require("../../models/genre.model");

let server;

describe("first", () => {
  beforeEach(() => {
    server = require("../../index");
  });

  afterEach(async () => {
    server.close();
    await GenreModel.remove({});
  });

  let token;
  let name;
  let userObject = {
    _id: mongoose.Types.ObjectId().toHexString(),
    isAdmin: true,
  };

  const execute = async () => {
    return await request(server)
      .post("/api/genres")
      .set("x-auth-token", token)
      .send({ name });
  };

  beforeEach(() => {
    token = new UserModel(userObject).genAuthToken();
    name = "genre1";
  });

  it("should return 403 if no token is not set.", async () => {
    token = "wornge token";
    const res = await execute();
    expect(res.status).toBe(403);
  });

  it("should return 401 if token not verfied.", async () => {
    await execute();
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECERT);
    expect(decoded).toMatchObject(userObject);
  });
});
