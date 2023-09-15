const request = require("supertest");
const { Genre } = require("../../models/genre");

let server;

describe("/api/genres", () => {
  beforeEach(() => {
    server = require("../../index");
  });
  afterEach(async () => {
    server.close();
    await Genre.deleteMany({});
  });

  describe("GET /", () => {
    it("should return all genres", async () => {
      await Genre.collection.insertMany([
        { name: "genre1" },
        { name: "genre2" },
      ]);

      const res = await request(server).get("/api/genres");
      expect(res.status).toBe(200);
      expect(res.body.length).toBe(2);
      expect(res.body.some((g) => g.name === "genre1")).toBeTruthy();
      expect(res.body.some((g) => g.name === "genre2")).toBeTruthy();
    });
  });

  describe("GET /:id", () => {
    it("should return a genre if valid id is passed", async () => {
      // direct into db
      // await Genre.collection.insertOne({
      //     name: "genre1"
      // })

      // useses mongoose, applies validation, miiddleware and schema definitions -- access to _id
      const genre = new Genre({ name: "Drama" });
      await genre.save();

      const res = await request(server).get("/api/genres/" + genre._id);

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty("name", genre.name);
    });

    it("should return a 404 if invalid id is passed", async () => {
     
      const res = await request(server).get("/api/genres/1");

      expect(res.status).toBe(404);
    });
  });

  describe('POST /', () => {
    it('should return a 401 if client id not loggen in', async () => {
        const  res = await request(server)
            .post('/api/genres')
            .send({ name: 'genre1'})
            
        expect(res.status).toBe(401)
    })
  })
});
