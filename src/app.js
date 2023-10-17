const express = require("express");
const app = express();
const userRouter = require('./routes/musicians')

//TODO: Create a GET /musicians route to return all musicians
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/musicians', userRouter)

module.exports = app;
