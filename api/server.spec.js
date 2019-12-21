const request = require("supertest");
const server = require("./server");
const db = require("../database/dbConfig");

describe("server", () => {
  describe("GET /", () => {
    it("should return status 200", async () => {
      const res = await request(server).get("/");
      expect(res.status).toBe(200);
    });

    it("should return JSON format", async () => {
      const res = await request(server).get("/");
      expect(res.type).toMatch(/json/i);
    });
  });

  describe("POST /register", () => {
    describe("add user", () => {
      beforeEach(async () => {
        await db("users").truncate();
      });

      it("should return status 200", async () => {
        const res = await request(server)
          .post("/api/auth/register")
          .send({ username: "young blood", password: "gang" });
  
        expect(res.status).toBe(201);
      });

      it("should add a new user", async () => {
        await request(server)
          .post("/api/auth/register")
          .send({ username: "young king dave", password: "big ol doinks" });
  
        const users = await db("users");
        expect(users[0].username).toBe("young king dave");
      });
    });


  });

  describe("POST /login", () => {
    describe("login", () => {

      it("should return status 200", async () => {
        const res = await request(server)
          .post("/api/auth/login")
          .send({ username: "young king dave", password: "big ol doinks" });

        expect(res.status).toBe(200);
      });

      it("should return json format", async () => {
        const res = await request(server)
          .post('/api/auth/login')
          .send({ username: "new", password: "rapper" });

        expect(res.type).toMatch(/json/i);
      });

    });
  });
});
