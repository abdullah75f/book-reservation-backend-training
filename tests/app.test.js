const request = require("supertest");
const app = require("../app"); 

describe("Backend API", () => {
  it("should return a 200 status for the root route", async () => {
    const response = await request(app).get("/");
    expect(response.status).toBe(200);
  });
});
  