const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mongoos = require("mongoose");
const { UserModel } = require("../../models/users.model");
require("dotenv/config");

describe("user.generateAuthToken", () => {
  it("should return avalid JWT.", () => {
    const payload = {
      _id: new mongoos.Types.ObjectId().toHexString(),
      isAdmin: true,
    };
    const user = new UserModel(payload);
    const token = user.genAuthToken();
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECERT);
    expect(decoded).toMatchObject(payload);
  });
});

describe("user.isValidPassword", () => {
  it("should return a boolean after checking the password", async () => {
    const password = "1234";
    const salt = await bcrypt.genSalt(5);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new UserModel({ password: hashedPassword });
    const result = await user.isValidPassword(password);
    console.log(result)
    expect(result).toBe(true);
  });
});
