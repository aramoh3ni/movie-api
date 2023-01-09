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
      token = new UserModel({ isAdmin: true }).genAuthToken();
      const genres = [{ name: "genre1" }, { name: "genre2" }];
      await GenreModel.collection.insertMany(genres);

      const res = await request(server)
        .get("/api/genres")
        .set("x-auth-token", token);

      expect(res.status).toBe(200);
      expect(res.body.data.length).toBe(2);
      expect(res.body.data.some((g) => g.name === "genre1")).toBe(true);
      expect(res.body.data.some((g) => g.name === "genre2")).toBe(true);
    });
  });

  describe("GET /:id", () => {
    it("should return genre if valid id is passed.", async () => {
      const genre = new GenreModel({ name: "genre1ّ" });
      await genre.save();
      const res = await request(server).get("/api/genres/" + genre._id);

      expect(res.status).toBe(200);
      expect(res.body.data).toHaveProperty("name", genre.name);
    });

    it("should return 404 if invalid id is passed.", async () => {
      const res = await request(server)
        .get(`/api/genres/1`)
        .set("x-auth-token", token);
      expect(res.status).toBe(404);
    });

    it("should return 404 if genre with given id is not exists.", async () => {
      const id = mongoose.Types.ObjectId();
      const res = await request(server).get(`/api/genres/${id}`);

      expect(res.status).toBe(404);
    });
  });

  describe("POST /", () => {
    let name;
    let token;
    const execute = async () => {
      return await request(server)
        .post("/api/genres")
        .set("x-auth-token", token)
        .send({ name });
    };

    beforeEach(async () => {
      token = new UserModel({ isAdmin: true }).genAuthToken();
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
      name = new Array(52).join("a");
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

  describe("DELETE /:id", () => {
    let token;
    let genre;
    let id;

    const execute = async () => {
      return await request(server)
        .delete("/api/genres" + id)
        .set("x-auth-token", token);
    };

    beforeEach(async () => {
      genre = new GenreModel({ name: "genre1" });
      await genre.save();

      id = genre._id;
      token = new UserModel({ isAdmin: true }).genAuthToken();
    });

    it("sould 404 if id is invalid.", async () => {
      id = 123;
      const res = await execute();
      expect(res.status).toBe(404);
    });

    it("should return 403 if user is not an Admin", async () => {
      token = new UserModel({ isAdmin: false }).genAuthToken();
      const res = await execute();
      expect(res.status).toBe(403);
    });
  });
});
