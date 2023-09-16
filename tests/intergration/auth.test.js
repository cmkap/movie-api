const request = require("supertest");
const { User } = require("../../models/user");
const { Genre } = require("../../models/genre");

let server;

describe("auth middleware", () => {
  beforeEach(async() => {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    server = require("../../index");
  });
  afterEach(async () => {
    await Genre.deleteMany({});
    server.close();
  });

  let token;

  const exec = () => {
    return request(server)
      .post("/api/genres")
      .set("x-auth-token", token)
      .send({ name: "Drama" });
  };

  beforeEach(() => {
    token = new User().generateAuthToken();
  });

  it("should return 401 if no token is provided", async () => {
    // Arrange
    token = "";

    // Act
    const res = await exec();

    // Assert
    expect(res.status).toBe(401);
  });
  it("should return 400 token is invalid", async () => {
    token = "a";

    const res = await exec();

    expect(res.status).toBe(400);
  });
  it("should return 201 token is valid", async () => {
    const res = await exec();

    expect(res.status).toBe(201);
  });
});
