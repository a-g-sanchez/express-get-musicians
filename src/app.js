const express = require("express");
const app = express();
const port = 3000;

//TODO: Create a GET /musicians route to return all musicians
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

module.exports = app;
