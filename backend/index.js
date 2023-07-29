require("dotenv").config();
const PORT = process.env.PORT || 3001;

const express = require("express");
const mongoose = require("mongoose");
const app = express();

// middleware
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
