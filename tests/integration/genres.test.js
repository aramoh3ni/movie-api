const request = require("supertest");
const { GenreModel } = require("../../models/genre.model");
const { UserModel } = require("../../models/users.model");
const mongoose = require("mongoose");

let server;

describe("/api/genres", () => {
  beforeEach(() => {
    server = require("../../index");
  });
  afterEach(async () => {
    server.close();
    await GenreModel.deleteMany({});
  });

  describe("GET /", () => {
    it("shoud return all genres", async () => {
      await GenreModel.insertMany([{ name: "genre1" }, { name: "genre2" }]);

      const res = await request(server).get("/api/genres");
      expect(res.status).toBe(200);
      expect(res.body.data.length).toBe(2);
      expect(res.body.data.some((g) => g.name === "genre1")).toBe(true);
      expect(res.body.data.some((g) => g.name === "genre2")).toBe(true);
    });
  });

  describe("GET /:id", () => {
    it("should return 404 if invalid id is passed.", async () => {
      const res = await request(server).get(`/api/genres/1`);
      expect(res.status).toBe(404);
    });
  });

  describe("POST /", () => {
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

    it("should return 401 unuthorized if client in not logged in.", async () => {
      token = "";
      const res = await execute();
      expect(res.status).toBe(401);
    });

    it("should return 400 if genre property name lower then 5 characters.", async () => {
      name = "123";
      const res = await execute();
      expect(res.status).toBe(400);
    });

    it("should return 400 if gerne property name is bigger then 50 characters.", async () => {
      name = new Array(52).join("a")
      const res = await execute();
      expect(res.status).toBe(400);
    });

    it("should save genre if gerne is valid.", async () => {
      await execute();
      const genre = await GenreModel.find({ name });
      expect(genre).not.toBeNull();
    });

    it("should save genre if gerne have all valid properties.", async () => {
     const res = await execute();
      expect(res.body.data).toHaveProperty("name", "genre1");
      expect(res.body.data).toHaveProperty("_id");
    });
  });
});
