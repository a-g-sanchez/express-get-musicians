// install dependencies
const { execSync } = require("child_process");
execSync("npm install");
execSync("npm run seed");

const request = require("supertest");
const { db } = require("./db/connection");
const { Musician } = require("./models/index");
const app = require("./src/app");
const seedMusician = require("./seedData");
const { describe, test, expect } = require("@jest/globals");
const exp = require("constants");


describe("./musicians endpoint", () => {
  // Write your tests here
  test("Testing GET request", async () => {
    const response = await request(app).get("/musicians");
    const responseData = JSON.parse(response.text);
    //console.log(responseData)
    expect(response.statusCode).toBe(200);
    expect(responseData.length).toBe(3);
  });

  test("Testing GET by id", async () => {
    const response = await request(app).get("/musicians/2");
    const responseData = JSON.parse(response.text);
    //console.log(responseData)
    expect(response.statusCode).toBe(200);
    expect(responseData instanceof Musician).toBeTruthy;
    expect(responseData.name).toBe("Drake");
  });

  test("Testing PUT", async () => {
    const response = await request(app)
      .put("/musicians/1")
      .send({
        name: "Janet Jackson",
        instrument: "violin"
      })
      .expect(200);
    //console.log(response.body)
    expect(response.body.name).toBe("Janet Jackson");
  });

  test("Testing PUT name length", async () => {
    const response = await request(app)
    .put("/musicians/3")
    .send({
      name: "P",
      instrument: "yooo"
    })
    expect(response.statusCode).toBe(500)
    //check length
    //check for error message
    //expect(response.body).toHaveProperty("errors")
    //expect(Array.isArray(response.body.errors)).toBe(true)
  })

  test("Testing POST", async () => {
    const result = await request(app)
      .post("/musicians")
      .send({
        name: "Gunna",
        instrument: "Voice",
      })
      .expect(200);
    const resultData = JSON.parse(result.text);
    // console.log(resultData)
    // expect(resultData instanceof Musician).toBeTruthy;
    // expect(resultData.name).toBe("Gunna");
    expect(Array.isArray(resultData)).toBe(true);
  });

  test("Testing POST failing", async () => {
    const result = await request(app)
      .post("/musicians")
      .send({
        name: "Beyonce",
        instrument: "",
      })
    const resultData = JSON.parse(result.text);
    expect(resultData).toHaveProperty('errors')
    expect(Array.isArray(resultData.errors)).toBe(true);
  });

  test("Testing DELETE", async () => {
    const result = await request(app).delete("/musicians/2");
    expect(result.body.name).toBe("Drake");
  });
});

