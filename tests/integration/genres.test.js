const c = require("config");
const request = require("supertest");
const { GenreModel } = require("../../models/genre.model");
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
});
