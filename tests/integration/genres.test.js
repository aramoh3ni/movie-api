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
    it("should return 401 unuthorized if client in not logged in.", async () => {
      const res = await request(server)
        .post("/api/genres")
        .send({ name: "genre1" });

      expect(res.status).toBe(401);
    });

    it("should return 400 if genre property name lower then 5 characters.", async () => {
      const user = {
        _id: mongoose.Types.ObjectId().toHexString(),
        isAdmin: true,
      };
      const token = new UserModel(user).genAuthToken();

      const res = await request(server)
        .post("/api/genres")
        .set("x-auth-token", token)
        .send({ name: "123" });

      expect(res.status).toBe(400);
    });

    it("should return 400 if gerne property name is bigger then 50 characters.", async () => {
      const user = {
        _id: mongoose.Types.ObjectId().toHexString(),
        isAdmin: true,
      };
      const token = new UserModel(user).genAuthToken();
      const res = await request(server)
        .post("/api/genres")
        .set("x-auth-token", token)
        .send({ name: (10 ^ 100).toString() });

      expect(res.status).toBe(400);
    });

    it("should save genre if gerne is valid.", async () => {
      const user = {
        _id: mongoose.Types.ObjectId().toHexString(),
        isAdmin: true,
      };
      const token = new UserModel(user).genAuthToken();

      const res = await request(server)
        .post("/api/genres")
        .set("x-auth-token", token)
        .send({ name: "genre1" });

      const genre = await GenreModel.find({ name: "genre1" });

      expect(genre).not.toBeNull();
    });

    it("should save genre if gerne have all valid properties.", async () => {
      const user = {
        _id: mongoose.Types.ObjectId().toHexString(),
        isAdmin: true,
      };
      const token = new UserModel(user).genAuthToken();

      const res = await request(server)
        .post("/api/genres")
        .set("x-auth-token", token)
        .send({ name: "genre1" });

      expect(res.body.data).toHaveProperty('name', "genre1");
      expect(res.body.data).toHaveProperty("_id");
    });
  });
});
