require("dotenv").config();
const PORT = process.env.PORT || 3001;
const winston = require('winston');
const expressWinston = require('express-winston');
const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
var cors = require("cors");

const app = express();

// middleware
app.use(expressWinston.logger({
  transports: [
    new winston.transports.Console()
  ],
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.json()
  ),
  meta: false,
  msg: "HTTP  ",
  expressFormat: true,
  colorize: false,
  ignoreRoute: function (req, res) { return false; }
}));


app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});
app.use(express.json());

const workOutPage = require("./routes/workout");
const User = require("./routes/user");

app.use("/api/workouts", workOutPage);
app.use("/api/user", User);

mongoose
  .connect(process.env.CONNECTION_STRING)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`connected to db && server is up and running on ${PORT} !!`);
    });
  })
  .catch((err) => {
    console.log("error connecting to database", err);
  });
