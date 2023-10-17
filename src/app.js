const express = require("express");
const app = express();

//TODO: Create a GET /musicians route to return all musicians
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

module.exports = app;
